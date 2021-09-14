const { Markup } = require('telegraf');

module.exports.mainMenuKeyboard = () => Markup.keyboard([
    ['🗓️ На сегодня', '️️➡️ На завтра'],
    ['🔔 Ежедневная подписка'],
    ['♏ Изменить свой знак зодиака'],
]).resize();

module.exports.cancelKey = () => Markup.keyboard([
    ['❌ Отменить'],
]).resize().oneTime();

module.exports.horoscopeSignsKeyboard = () => Markup.keyboard([
    ['♈ Овен', '♉ Телец', '♊ Близнецы', '♋ Рак'],
    ['♌ Лев', '♍ Дева', '♎ Весы', '♏ Скорпион'],
    ['♐ Стрелец', '♑ Козерог', '♒ Водолей', '♓ Рыбы']
]);

module.exports.goToMainMenuKey = () => Markup.keyboard([
    ['🏠 Главное меню'],
]).oneTime().resize();

module.exports.subscriptionMenuKeyboard = (isSubscribed) => {
    const keysArr = [
        [(isSubscribed === true ? '❌ Отписаться от ежедневного гороскопа' : '✅ Подписаться на ежедневный гороскоп')]
    ];

    if (isSubscribed === true) {
        keysArr.push(['🕗 Изменить время'])
    } else {
        keysArr.splice(1, 1);
    }

    keysArr.push(['⬅️ Назад']);

    return Markup.keyboard(
        keysArr
    ).resize();
};