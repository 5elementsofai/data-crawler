const fs = require('fs');
const async = require('async');
const search = require('./import');


let rawContent = fs.readFileSync('./import.json', 'utf8');
let content = JSON.parse(rawContent);
let attendees = content.responses[0].value;

async.mapSeries(attendees, async attendee => {
    if ('photo' in attendee.member) {
        let image_url = attendee.member.photo.highres_link;
        let name = attendee.member.name.split(' ').join('%20');

        await search(image_url, name);
    }
});