const Query = require('../../../../stores/context/answerCbQuery')

const selectQueryHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const query = await Query.getAnswerCbQuery()

    const currentQuery = await Query.getCurrentAnswerCbQuery()

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/selectQuery') {

        ctx.replyWithHTML(`Список шаблонов уведомлений при нажатии на inline-клавиатуру:\n(Текст, айди)\n
        ${query.length == 0 ? "Пусто\n" : query.map(item => {
            return "\n" + `${item.query.map((queryPart) => { return `\n${queryPart.text}` }).join('')}\n<strong>${item._id}</strong>\n`
        }).join('')}` + `${currentQuery ? "\n\nВ данный момент выбран:\n" + currentQuery.query.map((queryPart) => { return `\n${queryPart.text}` }).join('') +
            "\n" + `<strong>${currentQuery._id}</strong>` : "\n\nВ данный момент ничего не выбрано\n\n"}` +
            "\n\nДля выбора шаблона, введи /selectQuery &lt;айди из списка&gt;")
    } else {
        Query.changeCurrentCbQuery(commandInstance)
        ctx.reply("Шаблон выбран")
    }
}

module.exports = selectQueryHandler