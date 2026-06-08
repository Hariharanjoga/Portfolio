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
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 }).catch((e)=>console.log('goto:',e.message));
  await new Promise(r => setTimeout(r, 6000));
  await page.screenshot({ path: DIR+'_v_hero.png' });
  for (const [id, file] of [['projects','_v_projects'],['experience','_v_exp']]) {
    await page.evaluate((i) => { const s=document.getElementById(i); if(s) s.scrollIntoView({block:'start'}); }, id);
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: DIR+file+'.png' });
  }
  console.log('done');
  await browser.close();
})();
