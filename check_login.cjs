const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

    console.log("Navigating to http://localhost:5173/login");
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2', timeout: 10000 });
    
    console.log("Waiting a bit...");
    await new Promise(r => setTimeout(r, 2000));
    
    await browser.close();
    console.log("Done.");
  } catch (err) {
    console.error("SCRIPT ERROR:", err);
  }
})();
