const MessageText = require('../../stores/context/voidMessage.js')

const messageHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    const message = await MessageText.getCurrentMessage()

    if (!message) return ctx.reply("Я тебя не понимаю")
    
    ctx.reply(message.data)
}

module.exports = messageHandler