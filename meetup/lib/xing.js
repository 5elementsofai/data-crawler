const puppeteer = require('puppeteer');
const fs = require('fs');
const config = require('../config/config');
const providerConfig = config.modules.xing;

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://login.xing.com/');

    // username -> .input__field.input__field--with-label
    await page.type('input[name="username"]', providerConfig.username, { delay: 8 });

    // password -> .input__field.input__field--with-label
    await page.type('input[name="password"]', providerConfig.password, { delay: 8 });

    // submit -> .sign-in-form__submit-btn
    await page.evaluate(() => {
        document.querySelector('button[type="submit"]').click();
    });

    await page.waitForResponse('https://www.xing.com/home');

    await page.goto("https://www.xing.com/contacts/requests/sent")

    const html = await page.content();

    await fs.promises.writeFile('./data/results-xing-requests-sent.html', html);

    /*

    for (let pageNumber = 1; pageNumber < 5; pageNumber++) {
        await page.goto("https://www.linkedin.com/search/results/people/?facetCurrentCompany=%5B%2212639123%22%5D&page=" + pageNumber);

        // waitForSelector: .search-results__list.list-style-none
        await page.waitForSelector('.search-results__list');

        const html = await page.content();

        await fs.promises.writeFile('./data/results-bcai-' + pageNumber + '.html', html);
    }
    */
})();