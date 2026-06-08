const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'http://localhost:8000/index.html';
const DIR = 'c:\\Users\\Hariharan\\Desktop\\Portfolio\\';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE, headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--window-size=1460,1000','--force-device-scale-factor=1'],
    defaultViewport: { width: 1460, height: 1000 },
  });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 }).catch(()=>{});
  await new Promise(r => setTimeout(r, 4500));
  await page.evaluate(() => { const s=document.getElementById('stack'); if(s) s.scrollIntoView({block:'center'}); });
  await new Promise(r => setTimeout(r, 1200));

  // where is the carousel on screen?
  const box = await page.evaluate(() => { const r=document.querySelector('.stack-3d').getBoundingClientRect(); return {cx:r.left+r.width/2, cy:r.top+r.height/2, top:r.top, bottom:r.bottom}; });

  // A) mouse exactly at carousel centre
  await page.mouse.move(box.cx, box.cy);
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: DIR+'_shot_center.png' });

  // B) mouse near top of viewport (cursor "up")
  await page.mouse.move(box.cx, 120);
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: DIR+'_shot_up.png' });

  console.log('carousel cy='+Math.round(box.cy)+' top='+Math.round(box.top)+' bottom='+Math.round(box.bottom));
  await browser.close();
})();
