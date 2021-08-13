const Query = require('../../../../stores/context/answerCbQuery.js')

const showQueriesHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const currentQuery = await Query.getCurrentAnswerCbQuery()

    const query = await Query.getAnswerCbQuery()

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance == '/showQueries') {
        ctx.replyWithHTML(`Список шаблонов приветственного сообщения:\n(Текст, айди)\n
        ${query.length == 0 ? "Пусто\n" : query.map(item => {
            return "\n" + `${item.query.map((queryPart) => { return `\n${queryPart}` }).join('')}\n<strong>${item._id}</strong>\n`
        }).join('')}` + `${currentQuery ? "\n\nВ данный момент выбран:\n" + currentQuery.query.map((queryPart) => { return `\n${queryPart}` }).join('') +
            "\n" + `<strong>${currentQuery._id}</strong>` : "\n\nВ данный момент ничего не выбрано\n\n"}` +
            "\n\n")
    }

    /**
     * 
     */
}

module.exports = showQueriesHandler