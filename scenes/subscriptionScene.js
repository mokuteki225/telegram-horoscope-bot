const { session, Markup, Scenes: { BaseScene } } = require('telegraf');
const { mainMenuKeyboard, subscriptionMenuKeyboard } = require('../keyboards');
const { subscribeForDailyScene } = require('./subscribeForDailyScene');

const subscriptionScene = new BaseScene('subscriptionScene');

subscriptionScene.enter(ctx => {
    ctx.reply('💬 Меню подписок', subscriptionMenuKeyboard(ctx.session.isSubscribed));
});

subscriptionScene.hears('✅ Подписаться на ежедневный гороскоп', ctx => {
    ctx.scene.enter('subscribeForDailyScene', { type: 'sub' });
});

subscriptionScene.hears('❌ Отписаться от ежедневного гороскопа', ctx => {
    ctx.scene.enter('subscribeForDailyScene', { type: 'unSub' });
});

subscriptionScene.hears('🕗 Изменить время', ctx => {
    ctx.scene.enter('subscribeForDailyScene', { type: 'editDate' })
});

module.exports.subscriptionScene = subscriptionScene;

