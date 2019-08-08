const request = require('request');
const cheerio = require('cheerio');

class Thingiverse {
    async getThingInfo(url) {
        return new Promise((resolve, reject) => {
            request(url, (err, resp, body) => {
                if(err) return reject(err);

                const $ = cheerio.load(body);

                resolve({
                    title: $(".item-page-info h1").text().trim(),
                    imageUrl: $("img.thing-img").attr('data-src'),
                    category: $(".content_stack a[href*='/categories'].icon-category").attr('href').split('/categories/')[1]
                });
            });
        });
    }
}

module.exports = new Thingiverse;