const Start = require('../../../../stores/context/start.js')

const showStartHandler = async ctx => {
    var userMessage = ctx.message.text

    const start = await Start.getStart()
    const currentStartData = (await Start.getCurrentStart())?.data


    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()
    if (commandInstance === '/showStarts') {
        ctx.reply(`Список шаблонов приветственного сообщения:\n
        ${start.length == 0 ? "Пусто\n" : start.map((item, index) => {
            return "\n" + `${index + 1}. ${item.data}\n`
        }).join('')}\n${currentStartData ? "Текущий выбор:\n" + commandInstance : ""}`)
    }
}

module.exports = showStartHandler