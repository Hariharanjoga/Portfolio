const puppeteer = require('puppeteer-core');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE, headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--autoplay-policy=no-user-gesture-required','--window-size=1400,950'],
    defaultViewport: { width: 1400, height: 950 },
  });
  const page = await browser.newPage();
  const tts = [];
  page.on('request', r => { if (r.url().includes('/api/tts')) tts.push(r.method()); });
  page.on('console', m => { const t=m.text(); if(/error|fail|undefined/i.test(t)) console.log('PAGE:', t); });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 90000 }).catch(e => console.log('goto', e.message));
  await new Promise(r => setTimeout(r, 5000)); // boot overlay
  const hasFab = await page.$('#ask-fab');
  console.log('ASK-AI fab present:', !!hasFab);
  await page.click('#ask-fab').catch(e => console.log('fab click err', e.message));
  await new Promise(r => setTimeout(r, 3500)); // allow greeting setTimeout(480) + TTS fetch
  console.log('=> /api/tts calls after opening chat:', tts.length);
  await browser.close();
})();
