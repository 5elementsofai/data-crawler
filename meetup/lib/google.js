const puppeteer = require('puppeteer');

async function searchByImage(image_url, query) {
    let url = 'https://www.google.com/searchbyimage?site=search&sa=X&image_url=' + image_url + '&q=' + query;

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('.srg .g');

    const html = await page.content();
    await fs.promises.writeFile(file_path, html);

    await browser.close();

    return html;
};
module.exports = {
    searchByImage
};