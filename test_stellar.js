const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/');
  
  // wait for StellarSdk to load
  await page.waitForFunction('window.StellarSdk !== undefined');
  
  const result = await page.evaluate(() => {
    try {
      const kp = window.StellarSdk.Keypair.random();
      return { pk: kp.publicKey(), sk: kp.secret() };
    } catch (e) {
      return { error: e.message };
    }
  });
  
  console.log(result);
  await browser.close();
})();
