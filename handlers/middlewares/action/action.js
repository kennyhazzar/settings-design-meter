const Feedback = require('../../../stores/context/feedback.js')

const AnswerCbQuery = require('../../../stores/context/answerCbQuery.js')

const Message = require('../../../stores/logs/messageUser.js')

const actionHandler = async (ctx, actionChoiceMarkup = null) => {

    const currentFeedback = await Feedback.getCurrentFeedback()

    const currentCbQuery = await AnswerCbQuery.getCurrentAnswerCbQuery()

    if (!currentFeedback) {
        return ctx.answerCbQuery("Ответы не настроены. Обратитесь к администратору")
    } else if (!currentCbQuery) {
        return ctx.answerCbQuery("Ответы не настроены. Обратитесь к администратору")
    }

    const messageId = ctx.callbackQuery.message.text.slice(ctx.callbackQuery.message.text.lastIndexOf(':') + 2)

    const queryChat = await Message.getMessageOne({ messageId: +messageId })

    if (actionChoiceMarkup == null) {
        return ctx.answerCbQuery('Что-то пошло не так. Сообщите о проблеме')
    }

    console.log(currentFeedback.feedback[actionChoiceMarkup])
    try {
        ctx.answerCbQuery(currentCbQuery.query[actionChoiceMarkup])
        ctx.editMessageText(
            `Макет от @${queryChat.context.user.username} оценен как ${currentCbQuery.query[actionChoiceMarkup]}\nОценил: @${ctx.callbackQuery.from.username}
        `)
        ctx.telegram.sendMessage(queryChat.context.chatId, currentFeedback.feedback[actionChoiceMarkup], {
            parse_mode: 'MarkdownV2',
            reply_to_message_id: queryChat.messageId,
            disable_web_page_preview: true
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = actionHandler