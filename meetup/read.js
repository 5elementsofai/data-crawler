const cheerio = require('cheerio');
const fs = require('fs');

(async () => {
    let files = fs.readdirSync('./data');

    let value = files.map(file => {
        let html = fs.readFileSync('./data/' + file, 'utf8');
        let $ = cheerio.load(html);

        let links = $('.srg .g').map(function () {
            let href = $(this).find('.rc .r a').attr('href');

            let links = [
                'linkedin.com',
                'xing.com'
            ];
            for (let link of links) {
                if (href.indexOf(link) > -1) {
                    return href;
                }
            }
        }).get();
        
        let name = file.split('%20').join(' ').replace('searchbyimage-', '').replace('.html', '');
        return {
            name,
            links
        };
    });

    console.log('value', value);


    fs.writeFileSync('./export.json', JSON.stringify(value, null, 4));
})();