const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'http://localhost:3001/';
const DIR = 'c:\\Users\\Hariharan\\Desktop\\Portfolio\\';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE, headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--window-size=1460,1000','--force-device-scale-factor=1'],
    defaultViewport: { width: 1460, height: 1000 },
  });
  const page = await browser.newPage();
  // first dev hit triggers Turbopack compile — give it room
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 }).catch((e)=>console.log('goto:',e.message));
  await new Promise(r => setTimeout(r, 6000));
  await page.screenshot({ path: DIR+'_nx_hero.png' });
  await page.evaluate(() => { const s=document.getElementById('stack'); if(s) s.scrollIntoView({block:'center'}); });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: DIR+'_nx_stack.png' });
  // grab any console errors
  console.log('shots done');
  await browser.close();
})();
