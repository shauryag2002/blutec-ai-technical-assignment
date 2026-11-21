const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const ARTIFACT_DIR = '/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638';

async function runTests() {
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--no-sandbox',
    '--window-size=1280,820',
    '--remote-debugging-port=9222',
    'about:blank'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  const list = await new Promise(r => http.get('http://127.0.0.1:9222/json/list', res => {
    let d = ''; res.on('data', c => d += c); res.on('end', () => r(JSON.parse(d)));
  }));

  const pageTarget = list.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const curId = id++;
    const handler = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id === curId) {
        ws.removeEventListener('message', handler);
        if (m.error) reject(m.error);
        else resolve(m.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });
  await new Promise(r => ws.onopen = r);

  await send('Page.enable');
  await send('Runtime.enable');

  const evalJs = async (expr) => {
    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.text || JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  };

  const takeScreenshot = async (filename) => {
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${ARTIFACT_DIR}/${filename}`, Buffer.from(shot.data, 'base64'));
    console.log(`[Screenshot saved]: ${filename}`);
  };

  console.log('--- 1. TESTING /puppies PAGE ---');
  await send('Page.navigate', { url: 'http://localhost:5173/puppies' });
  await new Promise(r => setTimeout(r, 1200));

  // Desktop view
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 820, deviceScaleFactor: 1, mobile: false });
  await evalJs('window.scrollTo(0, 0)');
  await new Promise(r => setTimeout(r, 600));

  const pupsInitialStats = await evalJs(`(() => {
    const total = document.querySelectorAll('[data-reveal="true"]').length;
    const armed = document.querySelectorAll('[data-armed="true"]').length;
    const revealed = document.querySelectorAll('[data-revealed="true"]').length;
    const overflow = document.documentElement.scrollWidth > window.innerWidth;
    const eagerImages = Array.from(document.querySelectorAll('.tp-sketches img')).slice(0, 2).map(img => ({
      loading: img.loading,
      fetchPriority: img.getAttribute('fetchpriority'),
      hasDimensions: !!(img.width && img.height)
    }));
    return { total, armed, revealed, overflow, eagerImages };
  })()`);

  console.log('Puppies page initial stats:', JSON.stringify(pupsInitialStats, null, 2));
  await takeScreenshot('puppies_top_desktop.png');

  // Scroll down by 700px on /puppies
  console.log('Scrolling down 700px on /puppies...');
  await evalJs('window.scrollTo(0, 700)');
  await new Promise(r => setTimeout(r, 800));

  const pupsScrollStats = await evalJs(`(() => {
    const revealed = document.querySelectorAll('[data-revealed="true"]').length;
    return { revealed };
  })()`);
  console.log('Puppies page after 700px scroll, revealed elements:', pupsScrollStats.revealed);
  await takeScreenshot('puppies_scrolled_desktop.png');

  // Scroll to bottom
  console.log('Scrolling to bottom of /puppies (Gone Home section)...');
  await evalJs('window.scrollTo(0, 2200)');
  await new Promise(r => setTimeout(r, 800));
  await takeScreenshot('puppies_bottom_desktop.png');

  // Test Mobile view for /puppies
  console.log('Testing Mobile View (390x844) for /puppies...');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await evalJs('window.scrollTo(0, 0)');
  await new Promise(r => setTimeout(r, 600));
  const mobilePupsOverflow = await evalJs('document.documentElement.scrollWidth > window.innerWidth');
  console.log('Mobile puppies horizontal overflow (> 390px):', mobilePupsOverflow);
  await takeScreenshot('puppies_top_mobile.png');

  console.log('--- 2. TESTING /happy-families PAGE ---');
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 820, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://localhost:5173/happy-families' });
  await new Promise(r => setTimeout(r, 1200));
  await evalJs('window.scrollTo(0, 0)');
  await new Promise(r => setTimeout(r, 600));

  const famInitialStats = await evalJs(`(() => {
    const total = document.querySelectorAll('[data-reveal="true"]').length;
    const armed = document.querySelectorAll('[data-armed="true"]').length;
    const revealed = document.querySelectorAll('[data-revealed="true"]').length;
    const overflow = document.documentElement.scrollWidth > window.innerWidth;
    const eagerImages = Array.from(document.querySelectorAll('.tp-wall img')).slice(0, 4).map(img => ({
      loading: img.loading,
      fetchPriority: img.getAttribute('fetchpriority'),
      hasDimensions: !!(img.width && img.height)
    }));
    return { total, armed, revealed, overflow, eagerImages };
  })()`);
  console.log('Happy Families page initial stats:', JSON.stringify(famInitialStats, null, 2));
  await takeScreenshot('happy_families_top_desktop.png');

  // Scroll down by 800px on /happy-families
  console.log('Scrolling down 800px on /happy-families...');
  await evalJs('window.scrollTo(0, 800)');
  await new Promise(r => setTimeout(r, 800));

  const famScrollStats = await evalJs(`(() => {
    const revealed = document.querySelectorAll('[data-revealed="true"]').length;
    return { revealed };
  })()`);
  console.log('Happy Families page after 800px scroll, revealed elements:', famScrollStats.revealed);
  await takeScreenshot('happy_families_scrolled_desktop.png');

  // Test Lightbox Modal on /happy-families
  console.log('Testing Lightbox Modal interaction & accessibility...');
  await evalJs(`document.querySelector('.tp-wall__print').click()`);
  await new Promise(r => setTimeout(r, 500));
  const lightboxStats = await evalJs(`(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const hasAriaModal = dialog ? dialog.getAttribute('aria-modal') : null;
    const closeBtn = dialog ? dialog.querySelector('button[aria-label="Close photo preview"]') : null;
    const bodyLocked = document.body.style.overflow === 'hidden';
    return { hasDialog: !!dialog, hasAriaModal, hasCloseBtn: !!closeBtn, bodyLocked };
  })()`);
  console.log('Lightbox stats:', JSON.stringify(lightboxStats, null, 2));
  await takeScreenshot('happy_families_lightbox.png');

  // Close lightbox via Escape key
  await evalJs(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))`);
  await new Promise(r => setTimeout(r, 300));
  const lightboxClosed = await evalJs(`!document.querySelector('[role="dialog"]') && document.body.style.overflow !== 'hidden'`);
  console.log('Lightbox closed cleanly with Escape:', lightboxClosed);

  // Test Mobile view for /happy-families
  console.log('Testing Mobile View (390x844) for /happy-families...');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await evalJs('window.scrollTo(0, 0)');
  await new Promise(r => setTimeout(r, 600));
  const mobileFamOverflow = await evalJs('document.documentElement.scrollWidth > window.innerWidth');
  console.log('Mobile Happy Families horizontal overflow (> 390px):', mobileFamOverflow);
  await takeScreenshot('happy_families_top_mobile.png');

  console.log('--- 3. TESTING prefers-reduced-motion ---');
  await send('Emulation.setEmulatedMedia', {
    media: 'screen',
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
  });
  await send('Page.navigate', { url: 'http://localhost:5173/puppies' });
  await new Promise(r => setTimeout(r, 1200));

  const reducedMotionStats = await evalJs(`(() => {
    const total = document.querySelectorAll('[data-reveal="true"]').length;
    const armed = document.querySelectorAll('[data-armed="true"]').length;
    const revealed = document.querySelectorAll('[data-revealed="true"]').length;
    return { total, armed, revealed, allRevealedInstantly: total > 0 && total === revealed };
  })()`);
  console.log('prefers-reduced-motion stats on /puppies:', JSON.stringify(reducedMotionStats, null, 2));

  ws.close();
  chrome.kill();
  console.log('--- ALL TESTS COMPLETED SUCCESSFULLY! ---');
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

