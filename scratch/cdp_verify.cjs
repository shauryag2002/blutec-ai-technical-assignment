const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function main() {
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9222',
    '--hide-scrollbars'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  const list = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });

  const pageTarget = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let msgId = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  };

  const send = (method, params = {}) => new Promise((resolve) => {
    const id = msgId++;
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });

  await new Promise(r => ws.onopen = r);

  console.log('Connected to CDP');
  await send('Page.enable');
  await send('Runtime.enable');

  // Test 1: Mobile Hero View (390x844)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 1500));

  // Screenshot Mobile Hero
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_mobile_hero.png', Buffer.from(shot1.data, 'base64'));
  console.log('Saved verify_mobile_hero.png');

  // Check Sticky Bottom Bar
  const barEval = await send('Runtime.evaluate', {
    expression: `(() => {
      const bar = document.querySelector('[data-whatsapp-bar="true"]');
      if (!bar) return { found: false };
      const rect = bar.getBoundingClientRect();
      const style = getComputedStyle(bar);
      return {
        found: true,
        bottom: rect.bottom,
        position: style.position,
        height: rect.height,
        links: Array.from(bar.querySelectorAll('a')).map(a => a.textContent.trim())
      };
    })()`,
    returnByValue: true
  });
  console.log('Mobile Sticky Bar Info:', barEval.result.value);

  // Test 2: Mobile Menu Opening Animation
  await send('Runtime.evaluate', {
    expression: `document.querySelector('button[aria-haspopup="dialog"]').click()`
  });
  await new Promise(r => setTimeout(r, 260));

  const menuOpenEval = await send('Runtime.evaluate', {
    expression: `(() => {
      const menu = document.querySelector('.tp-menu');
      if (!menu) return { open: false };
      return {
        open: menu.hasAttribute('open'),
        closing: menu.dataset.closing,
        classes: menu.className
      };
    })()`,
    returnByValue: true
  });
  console.log('Menu Open Status:', menuOpenEval.result.value);

  const shotMenu = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_mobile_menu_open.png', Buffer.from(shotMenu.data, 'base64'));
  console.log('Saved verify_mobile_menu_open.png');

  // Test 3: Close Menu and test Closing Animation
  await send('Runtime.evaluate', {
    expression: `document.querySelector('.tp-menu button').click()`
  });
  await new Promise(r => setTimeout(r, 120)); // Mid closing animation

  const menuCloseEval = await send('Runtime.evaluate', {
    expression: `(() => {
      const menu = document.querySelector('.tp-menu');
      return {
        hasMenu: !!menu,
        closing: menu ? menu.dataset.closing : null
      };
    })()`,
    returnByValue: true
  });
  console.log('Menu Closing status:', menuCloseEval.result.value);

  await new Promise(r => setTimeout(r, 450)); // After closing completes

  // Test 4: Desktop View (1280x820)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 820,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 1200));

  const shotDesktopHero = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_desktop_hero_lineup.png', Buffer.from(shotDesktopHero.data, 'base64'));
  console.log('Saved verify_desktop_hero_lineup.png');

  // Test 5: Scroll between Hero and Meet The Pups to observe walking footprints
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 420)` });
  await new Promise(r => setTimeout(r, 300));

  const printsEval = await send('Runtime.evaluate', {
    expression: `(() => {
      const prints = document.querySelectorAll('.pup-prints svg');
      const actor = document.querySelector('.pup-actor');
      const visiblePrints = Array.from(prints).filter(p => parseFloat(getComputedStyle(p).opacity) > 0.05);
      const actorPose = actor ? actor.querySelector('.pup-actor__body')?.firstElementChild?.getAttribute('data-pose') : null;
      return {
        totalPrints: prints.length,
        visiblePrintsCount: visiblePrints.length,
        actorPose
      };
    })()`,
    returnByValue: true
  });
  console.log('Mid-travel Prints Info (scrollY=420):', printsEval.result.value);

  const shotWalking = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_walking_footprints.png', Buffer.from(shotWalking.data, 'base64'));
  console.log('Saved verify_walking_footprints.png');

  // Test 6: Arrived at Meet The Pups footpath (scrollY = 900)
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 950)` });
  await new Promise(r => setTimeout(r, 300));

  const arrivedEval = await send('Runtime.evaluate', {
    expression: `(() => {
      const printsContainer = document.querySelector('.pup-prints');
      const prints = document.querySelectorAll('.pup-prints svg');
      const visiblePrints = Array.from(prints).filter(p => parseFloat(getComputedStyle(p).opacity) > 0.05);
      const actor = document.querySelector('.pup-actor');
      const actorPose = actor ? actor.querySelector('.pup-actor__body')?.firstElementChild?.getAttribute('data-pose') : null;
      const staticBuddies = Array.from(document.querySelectorAll('.pup-stop > .pup-buddy')).map(b => getComputedStyle(b).visibility);
      return {
        printsContainerDisplay: printsContainer ? printsContainer.style.display : null,
        visiblePrintsCount: visiblePrints.length,
        actorPose,
        staticBuddiesVisibility: staticBuddies
      };
    })()`,
    returnByValue: true
  });
  console.log('Arrived at Footpath Info (scrollY=950):', arrivedEval.result.value);

  const shotLanded = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_landed_clean_footpath.png', Buffer.from(shotLanded.data, 'base64'));
  console.log('Saved verify_landed_clean_footpath.png');

  ws.close();
  chrome.kill();
  console.log('All verification tests completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

