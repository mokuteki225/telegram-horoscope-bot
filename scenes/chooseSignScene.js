const { session, Markup, Scenes: { BaseScene } } = require('telegraf');
const chooseSignScene = new BaseScene('chooseSignScene');
const  signsList  = require('../data/signsList.json');
const { horoscopeSignsKeyboard,  mainMenuKeyboard } = require('../keyboards');

chooseSignScene.enter(ctx => {
    ctx.reply('Привет, выбери свой знак зодиака', horoscopeSignsKeyboard());
});

chooseSignScene.on('text', ctx => {
    let msg = ctx.message.text;

    for (i in signsList) {
        if (msg === signsList[i]) {
            ctx.session ??= {};
            ctx.session.sign = msg;
            ctx.session.signUrl = i;

            return ctx.scene.leave();
        }
    }

    return ctx.reply('ты что то не то написал, попробуй ещё раз');
});

chooseSignScene.leave(ctx => {
    ctx.reply('Твой знак - ' + ctx.session.sign, mainMenuKeyboard());
});

module.exports.chooseSignScene = chooseSignScene;