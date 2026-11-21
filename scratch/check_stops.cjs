const { spawn } = require('child_process');
const http = require('http');

async function check() {
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--no-sandbox',
    '--window-size=1280,820',
    '--remote-debugging-port=9222',
    'http://localhost:5173/'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  const list = await new Promise(r => http.get('http://127.0.0.1:9222/json/list', res => {
    let d = ''; res.on('data', c => d += c); res.on('end', () => r(JSON.parse(d)));
  }));

  const pageTarget = list.find(t => t.type === 'page' && t.url.includes('5173')) || list.find(t => t.type === 'page');
  console.log('Target page URL:', pageTarget.url);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) => new Promise(r => {
    const curId = id++;
    const handler = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id === curId) { ws.removeEventListener('message', handler); r(m.result); }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });
  await new Promise(r => ws.onopen = r);

  const res = await send('Runtime.evaluate', {
    expression: `JSON.stringify({
      url: location.href,
      innerWidth: window.innerWidth,
      hero: !!document.getElementById('pup-stop-hero'),
      meet: !!document.getElementById('pup-stop-meet'),
      printsCount: document.querySelectorAll('.pup-prints svg').length,
      actorVisible: !!document.querySelector('.pup-actor')
    }, null, 2)`,
    returnByValue: true
  });
  console.log('Result:\n' + res.result.value);

  // Now test smooth scrolling from 0 to 500
  for (let y = 30; y <= 500; y += 30) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
    await new Promise(r => setTimeout(r, 20));
  }

  const scrollRes = await send('Runtime.evaluate', {
    expression: `JSON.stringify({
      scrollY: window.scrollY,
      printsDisplay: document.querySelector('.pup-prints')?.style.display,
      visiblePaws: Array.from(document.querySelectorAll('.pup-prints svg')).filter(s => parseFloat(getComputedStyle(s).opacity) > 0.1).length,
      actorTransform: document.querySelector('.pup-actor')?.style.transform
    }, null, 2)`,
    returnByValue: true
  });
  console.log('During scroll (y=500):\n' + scrollRes.result.value);

  // Now arrive at Meet The Pups footpath (y = 900)
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 950)` });
  await new Promise(r => setTimeout(r, 100));

  const arrivalRes = await send('Runtime.evaluate', {
    expression: `JSON.stringify({
      scrollY: window.scrollY,
      printsDisplay: document.querySelector('.pup-prints')?.style.display,
      visiblePaws: Array.from(document.querySelectorAll('.pup-prints svg')).filter(s => parseFloat(getComputedStyle(s).opacity) > 0.1).length,
      actorTransform: document.querySelector('.pup-actor')?.style.transform
    }, null, 2)`,
    returnByValue: true
  });
  console.log('After arrival at footpath (y=950):\n' + arrivalRes.result.value);

  ws.close();
  chrome.kill();
}
check();
