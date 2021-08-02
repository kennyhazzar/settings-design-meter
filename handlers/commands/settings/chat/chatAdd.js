const Chat = require('../../../../stores/context/chat')

const chatSettingsHandler = async ctx => {
    if (ctx.chat.type !== "private") return null

    var userMessage = ctx.message.text

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    const chatIsInclude = await Chat.getChat({ isInclude: true })
    const chatIsNotInclude = await Chat.getChat({ isInclude: false })

    if (commandInstance === '/chatAdd') {
        ctx.reply(`Активные чаты:\n${chatIsInclude.length == 0 ? "Пусто\n" : "(Название, айди)\n"
            + chatIsInclude.map((item, index) => {
                return `${index + 1}. ${item.chat.chat.title}, ${item.chat.chat.id}\n`
            }).join('')
            }\nНеактивные чаты:\n${chatIsNotInclude.length == 0 ? "Пусто\n" : "(Название, айди)\n"
                + chatIsNotInclude.map((item, index) => {
                    return `${index + 1}. ${item.chat.chat.id}\n`
                }).join('')}` +
            "\nДля добавления чатов введите addChat <айди чата из неактивного списка>")
    } else {
        ctx.reply('абибу')
    }


}

module.exports = chatSettingsHandler