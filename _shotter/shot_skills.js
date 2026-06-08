const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DIR = 'c:\\Users\\Hariharan\\Desktop\\Portfolio\\';
(async () => {
  const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--force-device-scale-factor=1'],
    defaultViewport: { width: 1460, height: 1000 } });
  const p = await b.newPage();
  await p.goto('http://localhost:3001/', { waitUntil: 'networkidle2', timeout: 90000 }).catch(e => console.log('goto', e.message));
  await new Promise(r => setTimeout(r, 5500));
  await p.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')));
  await new Promise(r => setTimeout(r, 500));
  const el = await p.$('.skill-cats');
  await el.screenshot({ path: DIR + '_skills.png' });
  console.log('done'); await b.close();
})();
