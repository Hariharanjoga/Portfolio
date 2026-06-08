const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE, headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--autoplay-policy=no-user-gesture-required',
           '--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream'],
    defaultViewport: { width: 1400, height: 950 },
  });
  const page = await browser.newPage();
  let tts = 0, errs = [], voice = [], all = [];
  page.on('request', r => { if (r.url().includes('/api/tts')) tts++; });
  page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
  page.on('console', m => { const t=m.text(); all.push(t); if(/\[voice\]/.test(t)) voice.push(t); else if(/error|undefined|uncaught|is not a function/i.test(t)) errs.push('CONSOLE: ' + t); });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 90000 }).catch(e => console.log('goto', e.message));
  await new Promise(r => setTimeout(r, 5000));

  // click "Talk to my AI" → opens chat, greeting, then startConvo() after greeting ends
  await page.evaluate(() => document.getElementById('talk-cta').click());
  await new Promise(r => setTimeout(r, 10000)); // wait past the ~3s greeting + startConvo + WS open

  const ph = await page.evaluate(() => (document.getElementById('chat-input')||{}).placeholder || '');
  console.log('chat-input placeholder:', JSON.stringify(ph));
  console.log('greeting /api/tts calls:', tts);
  console.log('[voice] logs:', voice.length ? voice : '(none)');
  console.log('JS errors:', errs.length ? errs : 'none');
  console.log('ALL console:', all.length ? all.slice(-12) : '(none)');
  console.log(/Listening/i.test(ph) ? 'PASS: entered continuous listening' : 'NOTE: not listening');
  await browser.close();
})();
