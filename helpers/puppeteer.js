const puppeteer = require('puppeteer');

module.exports.getPageContent = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setDefaultNavigationTimeout(0);

    await page.goto(url);
    const content = await page.content();

    browser.close();
    
    return content;
};