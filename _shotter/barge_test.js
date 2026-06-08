const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE, headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--autoplay-policy=no-user-gesture-required'],
    defaultViewport: { width: 1400, height: 950 },
  });
  const page = await browser.newPage();
  let started = 0, finished = 0, aborted = 0;
  page.on('request', r => { if (r.url().includes('/api/chat')) started++; });
  page.on('requestfinished', r => { if (r.url().includes('/api/chat')) finished++; });
  page.on('requestfailed', r => { if (r.url().includes('/api/chat')) { aborted++; console.log('  Q aborted:', (r.failure()||{}).errorText); } });
  page.on('console', m => { const t=m.text(); if(/error|undefined|uncaught/i.test(t)) console.log('PAGE:', t); });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 90000 }).catch(e => console.log('goto', e.message));
  await new Promise(r => setTimeout(r, 5000));

  // warm the chat route so cold-compile doesn't skew timing
  await page.evaluate(() => document.querySelectorAll('#hero-qs .q')[1].click());
  await new Promise(r => setTimeout(r, 9000));
  console.log(`(after warmup) started:${started} finished:${finished} aborted:${aborted}`);

  // Q1
  await page.evaluate(() => document.querySelectorAll('#hero-qs .q')[0].click());
  await new Promise(r => setTimeout(r, 800));        // Q1 is mid-stream
  // Q2 — should barge-in and abort Q1
  await page.evaluate(() => document.querySelectorAll('#hero-qs .q')[2].click());
  await new Promise(r => setTimeout(r, 9000));        // let Q2 finish

  console.log(`/api/chat -> started:${started}  finished:${finished}  aborted:${aborted}`);

  // What actually rendered? Count bot bubbles + show the last answer.
  const dom = await page.evaluate(() => {
    const bots = [...document.querySelectorAll('#chat-body .msg.bot .b')].map(e => e.textContent.trim()).filter(Boolean);
    return { count: bots.length, last: bots[bots.length - 1] || '' };
  });
  console.log('bot bubbles with text:', dom.count);
  console.log('LAST answer:', dom.last.slice(0, 220));
  await browser.close();
})();
