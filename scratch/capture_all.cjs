const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function capture() {
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

  await send('Page.enable');
  await send('Runtime.enable');

  // 1. Desktop Hero View (1280x820)
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 820, deviceScaleFactor: 1, mobile: false });
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await new Promise(r => setTimeout(r, 800));

  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_hero_desktop_final.png', Buffer.from(shot1.data, 'base64'));
  console.log('Saved verify_hero_desktop_final.png');

  // 2. Desktop Walking Footprints (scrollY = 480)
  for (let y = 30; y <= 480; y += 30) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
    await new Promise(r => setTimeout(r, 20));
  }
  await new Promise(r => setTimeout(r, 200));
  const shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_walking_footprints_final.png', Buffer.from(shot2.data, 'base64'));
  console.log('Saved verify_walking_footprints_final.png');

  // 3. Desktop Landed on Footpath Clean (scrollY = 950)
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 950)' });
  await new Promise(r => setTimeout(r, 300));
  const shot3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_landed_clean_footpath_final.png', Buffer.from(shot3.data, 'base64'));
  console.log('Saved verify_landed_clean_footpath_final.png');

  // 4. Mobile Hero View (390x844)
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await new Promise(r => setTimeout(r, 800));
  const shot4 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_hero_mobile_final.png', Buffer.from(shot4.data, 'base64'));
  console.log('Saved verify_hero_mobile_final.png');

  // 5. Mobile Menu Dialog Open
  await send('Runtime.evaluate', { expression: `document.querySelector('button[aria-haspopup="dialog"]').click()` });
  await new Promise(r => setTimeout(r, 300));
  const shot5 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_mobile_menu_open_final.png', Buffer.from(shot5.data, 'base64'));
  console.log('Saved verify_mobile_menu_open_final.png');

  ws.close();
  chrome.kill();
  console.log('All screenshots captured successfully!');
}
capture();

