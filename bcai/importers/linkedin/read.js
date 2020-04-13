const cheerio = require('cheerio');
const fs = require('fs');

(async () => {
    let files = await fs.promises.readdir('./data');

    let value = files.reduce(async (items, file) => {
        let html = await fs.promises.readFile('./data/' + file, 'utf8');
        let $ = cheerio.load(html);
        let elements = {};

        $('code').each(function () {
            let item = $(this).text().trim().trim("\n");
            let id = $(this).attr('id');

            try {
                elements[id] = JSON.parse(item);
            } catch (e) {
                elements[id] = "ERROR";
            }
        });
        items.push(elements);

        return items;
    }, []);

    fs.writeFileSync('./data.json', JSON.stringify(value, null, 4));
})();