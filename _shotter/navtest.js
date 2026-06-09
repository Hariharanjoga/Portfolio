const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DIR = 'c:\\Users\\Hariharan\\Desktop\\Portfolio\\';
(async () => {
  const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--autoplay-policy=no-user-gesture-required'],
    defaultViewport: { width: 1460, height: 950 } });
  const p = await b.newPage();
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 90000 }).catch(e => console.log('goto', e.message));
  await new Promise(r => setTimeout(r, 5500));
  const y0 = await p.evaluate(() => window.scrollY);
  // ask "What's his strongest project?" via the hero starter question (opens chat + sends)
  await p.evaluate(() => { const q = [...document.querySelectorAll('#hero-qs .q')].find(b => /strongest/i.test(b.textContent)); (q || document.querySelectorAll('#hero-qs .q')[1]).click(); });
  // poll for the focus highlight + scroll
  let sawFocus = false, focusEl = '';
  for (let i = 0; i < 24; i++) {
    await new Promise(r => setTimeout(r, 300));
    const f = await p.evaluate(() => { const e = document.querySelector('.ai-focus'); return e ? (e.querySelector('h3') ? e.querySelector('h3').textContent : e.id || e.tagName) : null; });
    if (f) { sawFocus = true; focusEl = f; break; }
  }
  await new Promise(r => setTimeout(r, 3500));
  const out = await p.evaluate(() => {
    const bots = [...document.querySelectorAll('#chat-body .msg.bot .b')];
    const last = bots[bots.length - 1];
    return { text: last ? last.textContent : '', scrollY: window.scrollY };
  });
  console.log('scrollY before:', y0, '| after:', out.scrollY, out.scrollY !== y0 ? '(scrolled ✓)' : '(no scroll)');
  console.log('focus highlight seen:', sawFocus, '| on:', focusEl);
  console.log('FOCUS leaked into chat text?', /FOCUS:/i.test(out.text) ? 'YES (bad)' : 'no (good)');
  console.log('answer starts:', JSON.stringify(out.text.slice(0, 80)));
  await b.close();
})();
