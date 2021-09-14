const fs = require('fs');
const cheerio = require('cheerio');
const signsList = require('./data/signsList.json');
const horoscopePredictions = require('./data/horoscopePredictions.json');
const { getPageContent } = require('./helpers/puppeteer');

module.exports.scrapeHoroscopes = async () => {
    const date = ['today', 'tomorrow'];

    for (i in date) {
        for (j in signsList) {
            console.log(j + ' ' + date[i]);
            const content = await getPageContent('https://orakul.com/horoscope/astrologic/general/' + j + '/' + date[i] + '.html');
            const $ = await cheerio.load(content);

            horoscopePredictions[j][date[i]] = $('p[class=]').text();
        }
    }
    fs.writeFile('./data/horoscopePredictions.json', JSON.stringify(horoscopePredictions, null, 2), (err) => {
        console.log(err);
    });
}

