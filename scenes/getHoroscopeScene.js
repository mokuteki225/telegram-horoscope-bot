const fs = require('fs');
const { session, Scenes: { BaseScene, } } = require('telegraf');
let horoscopePredictions = require('../data/horoscopePredictions.json');
const { mainMenuKeyboard } = require('../utils/keyboards');

module.exports.syncJson = async () => {
    horoscopePredictions = {};
    fs.readFile('./data/horoscopePredictions.json', 'utf-8', (err, data) => {
        horoscopePredictions = JSON.parse(data);
    });
};

const getHoroscopeScene = new BaseScene('getHoroscopeScene');

let horoscopeTxt = '';

getHoroscopeScene.enter(async (ctx) => {
    let date = (ctx.scene.state.date === 'today' ? 'сегодня' : 'завтра') + ':\n';
    horoscopeTxt = horoscopePredictions[ctx.session.signUrl][ctx.scene.state.date];
    ctx.reply(ctx.session.sign[0] + ' твой гороскоп на ' + date + horoscopeTxt, mainMenuKeyboard());
    return ctx.scene.leave();
});

module.exports.getHoroscopeScene = getHoroscopeScene;

