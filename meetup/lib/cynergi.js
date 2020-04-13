
const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://cynergi.ua.cgi.com/tibbr/#!/users/195562');
})();