const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
(async () => {
  const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new',
    args: ['--no-sandbox','--disable-gpu'], defaultViewport: { width: 1400, height: 950 } });
  const p = await b.newPage();
  let popups = 0;
  b.on('targetcreated', () => popups++); // counts new tabs/windows (a redirect would create one)
  await p.goto('http://localhost:3001/', { waitUntil: 'networkidle2', timeout: 90000 }).catch(e => console.log('goto', e.message));
  await new Promise(r => setTimeout(r, 5500)); // let embed.js load
  const urlBefore = p.url();
  await p.evaluate(() => { const btn = document.querySelector('.book-call'); if (btn) btn.click(); });
  await new Promise(r => setTimeout(r, 4500)); // modal + iframe
  const urlAfter = p.url();
  const info = await p.evaluate(() => ({
    calIframe: [...document.querySelectorAll('iframe')].some(f => (f.src || '').includes('cal.com')),
    calEls: [...document.body.children].map(c => c.tagName.toLowerCase()).filter(t => t.includes('cal')),
    anyIframe: document.querySelectorAll('iframe').length,
  }));
  console.log('URL before :', urlBefore);
  console.log('URL after  :', urlAfter, urlBefore === urlAfter ? '(SAME — no redirect ✓)' : '(CHANGED — redirected ✗)');
  console.log('new tabs/windows opened:', popups - 1, '(0 = no new-tab redirect ✓)');
  console.log('Cal iframe present:', info.calIframe, '| cal elements:', info.calEls, '| iframes:', info.anyIframe);
  await b.close();
})();
