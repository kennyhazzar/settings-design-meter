const { pushMessage } = require('../../stores/logs/messageUser.js')
const Chat = require('../../stores/context/chat.js')
const photoHandler = async (ctx, next) => {
    if (ctx.chat.type !== 'private') return null
    const chat = await Chat.getChat()
    if (chat.length === 0 || !chat) {
        return ctx.reply("Чат для отправки не выбран.\nЕсли вы администратор" +
            " добавьте чат для отправки через настройки")
    }
    await pushMessage({
        user: {
            firstName: ctx.chat.first_name,
            lastName: ctx.chat.last_name,
            username: ctx.chat.username,
        },
        messageId: ctx.message.message_id,
        chatId: ctx.chat.id,
        username: ctx.chat.username
    })

    return next()
}

module.exports = photoHandler