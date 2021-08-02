const { pushMessage } = require('../../stores/logs/messageUser.js')
const Chat = require('../../stores/context/chat.js')

const photoHandler = async (ctx, next) => {
    if (ctx.chat.type !== 'private') return null
    const chat = await Chat.getChat({ isInclude: true })
    if (chat.length === 0 || !chat) {
        return ctx.reply("Чат для отправки не выбран.\nЕсли вы администратор" +
            " добавьте чат для отправки через настройки")
    }
    for (let index = 0; index < chat.length; index++) {
        try {
            const chatId = chat[index].chat.chat.id
        await ctx.telegram.forwardMessage(
            chatId,
            ctx.chat.id,
            ctx.message.message_id,
            { disable_notification: true }
        )
        await ctx.telegram.sendMessage(chatId, `Макет от @${ctx.chat.username}!\nНомер: ${ctx.message.message_id}`, {
            reply_markup: {
                "inline_keyboard": [
                    [{ "text": "🔥Горячо", "callback_data": "Hot" },
                    { "text": "Тепло", "callback_data": "Warm" },
                    { "text": "Непонятно", "callback_data": "Unclear" }],
                    [{ "text": "Холодно", "callback_data": "Cold" }]
                ],
                force_reply: true,
            },
        })
        } catch (error) {
            ctx.reply(`Не получилось отправить сообщение в чат, ошибка:\n${error.response.description}`)
            console.log(JSON.stringify(error))
        }

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