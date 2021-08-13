const { pushMessage } = require('../../stores/logs/messageUser.js')
const { getChat } = require('../../stores/context/chat.js')
const { getCurrentChoices } = require('../../stores/context/choice.js')

const photoHandler = async (ctx, next) => {

    if (ctx.chat.type !== 'private') return null

    const inline = await getCurrentChoices()

    if (!inline) {
        return ctx.reply("Бот не настроен, обратитесь к администратору (клавиатура)")
    }

    const chat = await getChat({ isInclude: true })

    if (chat.length === 0 || !chat) {
        return ctx.reply("Бот не настроен, обратитесь к администратору " +
            "(отсутствует чат для отправки)")
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
                    "inline_keyboard": inline.choices,
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
    }, ctx.message.message_id)

    return next()
}

module.exports = photoHandler