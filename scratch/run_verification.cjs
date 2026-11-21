const puppeteer = require('/home/shaurya/Desktop/assessment/blutec-ai-technical-assignment/node_modules/puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. DESKTOP TESTS (1440x900)
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

  // A. Hero Top
  await page.screenshot({ path: '/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_hero_top_new.png' });

  // B. Transition (scrollY = 350) - puppy walking with footprint trail
  await page.evaluate(() => window.scrollTo({ top: 350, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: '/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_transition_walking.png' });

  // C. Landed on Footpath in Meet The Pups (scrollY = 700)
  await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: '/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_meet_landed_clean.png' });

  // D. Count puppies visible on page at scrollY = 700
  const countAt700 = await page.evaluate(() => {
    return [...document.querySelectorAll('.pup-actor')].filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && getComputedStyle(el).display !== 'none';
    }).length;
  });
  console.log('Visible puppies at 700:', countAt700);

  // E. Two Ways section (scrollY = 3500)
  await page.evaluate(() => {
    const el = document.querySelector('[data-section="paths"]');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: '/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_paths_single_pup.png' });

  // F. Fast scroll test: jump directly from 0 to 900
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 100));
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 150));
  await page.screenshot({ path: '/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_fast_scroll_clean_sky.png' });

  // Check if prints container has any visible prints
  const printsVisible = await page.evaluate(() => {
    const cont = document.querySelector('.pup-prints');
    if (!cont || getComputedStyle(cont).display === 'none') return false;
    const svgs = [...cont.querySelectorAll('svg')];
    return svgs.some(s => parseFloat(getComputedStyle(s).opacity) > 0.05);
  });
  console.log('Prints visible after fast scroll to 900:', printsVisible);

  // 2. MOBILE TESTS (375x812)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  // Wait for initial preloader transition (900ms) to fade away
  await new Promise(r => setTimeout(r, 1100));

  // A. Mobile Top
  await mobilePage.screenshot({ path: '/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_mobile_top_new.png' });

  // B. Click Mobile Menu button
  const menuBtn = await mobilePage.$('button[aria-haspopup="dialog"]');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 300));
    await mobilePage.screenshot({ path: '/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_mobile_menu_dialog.png' });
    // Close it
    const closeBtn = await mobilePage.$('dialog.tp-menu button');
    if (closeBtn) await closeBtn.click();
    await new Promise(r => setTimeout(r, 200));
  }

  // C. Mobile Meet the Pups
  await mobilePage.evaluate(() => {
    const el = document.querySelector('[data-section="meet"]');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 300));
  await mobilePage.screenshot({ path: '/home/shaurya/.gemini/antigravity/brain/ca51481f-bffd-485c-9e79-6f0fd0048638/verify_mobile_meet_grid.png' });

  await browser.close();
  console.log('All verification screenshots captured successfully!');
})();
