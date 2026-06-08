const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'http://localhost:8000/index.html';
const OUT = 'c:\\Users\\Hariharan\\Desktop\\Portfolio\\_shot.png';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--window-size=1460,1000','--force-device-scale-factor=1'],
    defaultViewport: { width: 1460, height: 1000 },
  });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 }).catch(()=>{});
  // let boot overlay fade + logos load + rings settle (real time)
  await new Promise(r => setTimeout(r, 4500));
  // scroll the stack section into view, no mouse → resting (cursor-centered) state
  await page.evaluate(() => {
    const s = document.getElementById('stack');
    if (s) s.scrollIntoView({ block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1500));
  const el = await page.$('#stack');
  if (el) { await el.screenshot({ path: OUT }); }
  else { await page.screenshot({ path: OUT }); }
  await browser.close();
  console.log('done');
})();
