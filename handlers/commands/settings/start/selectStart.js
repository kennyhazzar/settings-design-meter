const Start = require('../../../../stores/context/start.js')

const selectStartHandler = async ctx => {
    var userMessage = ctx.message.text

    const start = await Start.getStart()

    const currentStart = await Start.getCurrentStart()

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/selectStart') {

        ctx.reply(`Список шаблонов приветственного сообщения:\n(Текст, айди)\n
        ${start.length == 0 ? "Пусто\n" : start.map((item, index) => {
            return "\n" + `${index + 1}. ${item.data}\n${item._id}\n`
        }).join('')}` + `${currentStart ? "\n\nВ данный момент выбран:\n\n" + currentStart.data + 
        "\n" + currentStart._id : "\n\nВ данный момент ничего не выбрано\n\n"}` +
        "\n\nДля выбора шаблона, введи /selectStart <айди из списка>")
    } else {
        Start.changeCurrentStart(commandInstance)
        ctx.reply("Шаблон выбран")
    }
}

module.exports = selectStartHandler