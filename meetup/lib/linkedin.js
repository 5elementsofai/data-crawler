const puppeteer = require('puppeteer');
const fs = require('fs');
const config = require('../config/config');
const providerConfig = config.modules.linkedin;

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/login');

    // username -> .input__field.input__field--with-label
    await page.type('#username', providerConfig.username, { delay: 8 });

    // password -> .input__field.input__field--with-label
    await page.type('#password', providerConfig.password, { delay: 8 });

    // submit -> .sign-in-form__submit-btn
    await page.evaluate(() => {
        document.querySelector('.btn__primary--large.from__button--floating').click();
    });

    await page.waitForResponse('https://www.linkedin.com/feed/');

    for (let pageNumber = 1; pageNumber < 5; pageNumber++) {
        await page.goto("https://www.linkedin.com/search/results/people/?facetCurrentCompany=%5B%2212639123%22%5D&page=" + pageNumber);

        // waitForSelector: .search-results__list.list-style-none
        await page.waitForSelector('.search-results__list');

        const html = await page.content();

        await fs.promises.writeFile('./data/results-bcai-' + pageNumber + '.html', html);
    }
})();