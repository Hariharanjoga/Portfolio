const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DIR = 'c:\\Users\\Hariharan\\Desktop\\Portfolio\\';
(async () => {
  const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--force-device-scale-factor=1'],
    defaultViewport: { width: 1460, height: 1020 } });
  const p = await b.newPage();
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 90000 }).catch(e => console.log('goto', e.message));
  await new Promise(r => setTimeout(r, 5500));
  await p.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')));
  const el = await p.$('.proj-grid');
  await el.screenshot({ path: DIR + '_proj.png' });
  // list the card titles in order
  const titles = await p.evaluate(() => [...document.querySelectorAll('.proj-grid .card h3')].map(h => h.textContent));
  console.log('order:', JSON.stringify(titles));
  await b.close();
})();
