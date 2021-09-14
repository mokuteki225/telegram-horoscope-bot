require('dotenv').config();
let CronJob = require('cron').CronJob;
const { Telegraf, session, Scenes: { BaseScene, Stage } } = require('telegraf');
const { chooseSignScene } = require('./scenes/chooseSignScene');
const { getHoroscopeScene, syncJson } = require('./scenes/getHoroscopeScene');
const { scrapeHoroscopes } = require('./utils/scrapeHoroscopes');
const { subscribeForDailyScene } = require('./scenes/subscribeForDailyScene');
const { subscriptionScene } = require('./scenes/subscriptionScene');

const { mainMenuKeyboard, } = require('./utils/keyboards');

const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

const stage = new Stage([chooseSignScene, getHoroscopeScene, subscriptionScene, subscribeForDailyScene]);

let dailyHoroscopeScrapper = new CronJob('00 00 05 * * *', async () => {
	await scrapeHoroscopes();
	await syncJson();
}, null, true, 'Europe/Kiev');

dailyHoroscopeScrapper.start();

bot.use(session());
bot.use(stage.middleware());

bot.command('start', async (ctx) => {
	ctx.session ??= {};
	await ctx.scene.enter('chooseSignScene');
});

bot.hears('🗓️ На сегодня', ctx => {
	ctx.scene.enter('getHoroscopeScene', { date: 'today' });
});

bot.hears('️️➡️ На завтра', ctx => {
	ctx.scene.enter('getHoroscopeScene', { date: 'tomorrow' });
});

bot.hears('♏ Изменить свой знак зодиака', ctx => {
	ctx.scene.enter('chooseSignScene');
});
{ { } }
bot.hears('🔔 Ежедневная подписка', ctx => {
	ctx.scene.enter('subscriptionScene');
});

bot.launch();