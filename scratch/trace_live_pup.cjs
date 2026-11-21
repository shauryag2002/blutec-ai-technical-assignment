const puppeteer = require('/home/shaurya/Desktop/assessment/blutec-ai-technical-assignment/node_modules/puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle2' });

  const trace = [];
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

  for (let y = 0; y <= Math.min(maxScroll, 9000); y += 300) {
    await page.evaluate(top => window.scrollTo(0, top), y);
    await new Promise(r => setTimeout(r, 80));

    const pupInfo = await page.evaluate(() => {
      const actor = document.querySelector('.pup-actor');
      const body = document.querySelector('.pup-actor__body');
      return {
        scrollY: window.scrollY,
        actorTransform: actor ? actor.style.transform : null,
        bodyTransform: body ? body.style.transform : null,
        holding: actor ? actor.getAttribute('data-holding') : null
      };
    });
    trace.push(pupInfo);
  }

  console.log('TRACE SAMPLES:');
  trace.forEach(t => {
    console.log('scrollY: ' + t.scrollY + ' | actor: ' + t.actorTransform + ' | scale: ' + t.bodyTransform + ' | holding: ' + t.holding);
  });

  await browser.close();
})();

