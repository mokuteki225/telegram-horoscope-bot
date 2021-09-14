const { session, Scenes: { BaseScene } } = require('telegraf');
const cron = require('node-schedule');
let rule = new cron.RecurrenceRule();
rule.tz = 'Europe/Kiev'; 
const { verifyDate } = require('../dateVerifier');
const { cancelKey, mainMenuKeyboard } = require('../keyboards');

const subscribeForDailyScene = new BaseScene('subscribeForDailyScene');

const cancelJob = (jobId) => {
    if (cron.scheduledJobs[jobId]) {
        let tempJob = cron.scheduledJobs[jobId];
        tempJob.cancel();
    }
}

subscribeForDailyScene.enter((ctx) => {
    if (ctx.scene.state.type === 'unSub') {
        cancelJob('DAILY_SUB');

        ctx.session.isSubscribed = false;

        ctx.reply('💔 Вы успешно отменили подписку на ежедневный гороскоп');

        return ctx.scene.enter('subscriptionScene');
    } else {
        if (ctx.scene.state.type === 'editDate'); {
            cancelJob('DAILY_SUB');
        }

        return ctx.reply('🕖 введи время в которое тебе будет приходить ежедневный гороскоп в формате чч:мм, например: \n08:00\n06:30\n21:05', cancelKey());
    }
});

subscribeForDailyScene.hears('❌ Отменить', async (ctx) => {
    await ctx.scene.enter('subscriptionScene');
});

subscribeForDailyScene.on('text', ctx => {
    let msg = ctx.message.text; 

    if (verifyDate(msg)) {
        ctx.session.isSubscribed = true;

        cron.scheduledJobs['DAILY_SUB'] = cron.scheduleJob(/*'DAILY_SUB', */'0 ' + msg[3] + msg[4] + ' ' + msg[0] + msg[1] + ' * * *', rule, async () => {
            return ctx.scene.enter('getHoroscopeScene', { date: 'today' });
        });

        ctx.reply('хорошо, в ' + msg + ' я отправлю тебе гороскоп на день', mainMenuKeyboard());

        return ctx.scene.leave();
    } else {
        return ctx.reply('⛔ ты ввёл дату в неверном формате, правильно так: \n08:00\n06:30\n21:05')
    }
});

module.exports.subscribeForDailyScene = subscribeForDailyScene;