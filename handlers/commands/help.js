const StartMessage = require('../../stores/context/start.js')

const helpHandler = async ctx => {
    if (ctx.chat.type !== 'private') return
    const message = await StartMessage.getCurrentStart()
    if (!message) {
        ctx.reply("В базе данных не выбран start")
        return 
    }
    return ctx.replyWithHTML(message.data)
}

module.exports = helpHandler