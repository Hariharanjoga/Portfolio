const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DIR = 'c:\\Users\\Hariharan\\Desktop\\Portfolio\\';
(async () => {
  const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--force-device-scale-factor=1'],
    defaultViewport: { width: 1460, height: 940 } });
  const p = await b.newPage();
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 90000 }).catch(e => console.log('goto', e.message));
  await new Promise(r => setTimeout(r, 6500)); // boot + typed rotator
  await p.screenshot({ path: DIR + '_hero.png' });
  const h1 = await p.evaluate(() => (document.querySelector('#hero h1')||{}).textContent);
  console.log('h1:', JSON.stringify(h1));
  await b.close();
})();
