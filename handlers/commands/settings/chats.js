const Chat = require('../../../stores/context/chat')

const chatSettingsHandler = async ctx => {
    if (ctx.chat.type !== "private") return null

    var userMessage = ctx.message.text

    if (userMessage.substring(userMessage.search(' '), userMessage.length).trim() === 'add') {
        ctx.reply('команда add')
    }
}

module.exports = chatSettingsHandler