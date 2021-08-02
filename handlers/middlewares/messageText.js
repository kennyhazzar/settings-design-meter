const MessageText = require('../../stores/context/voidMessage.js')

const messageHandler = ctx => {
    if (ctx.chat.type !== 'private') return null
    const message = MessageText.getCurrentMessage()
    if (Object.keys(message).length == 0) return ctx.reply("Бот не настроен: ответ на текст.")
    ctx.reply(message.data)
}

module.exports = messageHandler