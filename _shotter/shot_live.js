const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DIR = 'c:\\Users\\Hariharan\\Desktop\\Portfolio\\';
(async () => {
  const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--force-device-scale-factor=1'],
    defaultViewport: { width: 1460, height: 1000 } });
  const p = await b.newPage();
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 90000 }).catch(e => console.log('goto', e.message));
  await new Promise(r => setTimeout(r, 5500));
  await p.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')));
  const clicked = await p.evaluate(() => { const c = document.querySelector('.card[data-live]'); if (c) { c.click(); return c.getAttribute('data-live'); } return null; });
  console.log('clicked live card ->', clicked);
  await new Promise(r => setTimeout(r, 7000)); // let the iframe load the live site
  const info = await p.evaluate(() => ({
    open: document.getElementById('live-modal').classList.contains('open'),
    host: document.getElementById('live-host').textContent,
    ready: document.getElementById('live-frame').classList.contains('ready'),
    url: location.href,
  }));
  console.log('modal state ->', JSON.stringify(info));
  await p.screenshot({ path: DIR + '_live.png' });
  await b.close();
})();
