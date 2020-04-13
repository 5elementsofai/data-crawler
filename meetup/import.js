const fs = require('fs');
const google = require('./lib/google');

async function searchByImage(image_url, name) {
    let file_path = './data/searchbyimage-' + name + '.html';

    if (!fs.existsSync(file_path)) {
        const html = google.searchByImage(image_url, name);
        await fs.promises.writeFile(file_path, html);
    }
};
module.exports = searchByImage;