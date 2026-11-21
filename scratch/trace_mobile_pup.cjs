const puppeteer = require('/home/shaurya/Desktop/assessment/blutec-ai-technical-assignment/node_modules/puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle2' });

  const trace = [];
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

  for (let y = 0; y <= Math.min(maxScroll, 8000); y += 400) {
    await page.evaluate(top => window.scrollTo(0, top), y);
    await new Promise(r => setTimeout(r, 80));

    const pupInfo = await page.evaluate(() => {
      const actor = document.querySelector('.pup-actor');
      const body = document.querySelector('.pup-actor__body');
      const layer = document.querySelector('.pup-layer');
      return {
        scrollY: window.scrollY,
        actorTransform: actor ? actor.style.transform : null,
        bodyTransform: body ? body.style.transform : null,
        holding: actor ? actor.getAttribute('data-holding') : null,
        layerFront: layer ? layer.getAttribute('data-front') : null,
        layerAnchor: layer ? layer.getAttribute('data-anchor') : null
      };
    });
    trace.push(pupInfo);
  }

  console.log('MOBILE TRACE SAMPLES:');
  trace.forEach(t => {
    console.log('scrollY: ' + t.scrollY + ' | actor: ' + t.actorTransform + ' | scale: ' + t.bodyTransform + ' | holding: ' + t.holding + ' | anchor: ' + t.layerAnchor);
  });

  await browser.close();
})();

