const Chat = require('../../../../stores/context/chat')

const chatSettingsHandler = async ctx => {
    if (ctx.chat.type !== "private") return null

    var userMessage = ctx.message.text

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    const chatIsInclude = await Chat.getChat({ isInclude: true })
    console.log(chatIsInclude)
    const chatIsNotInclude = await Chat.getChat({ isInclude: false })
    console.log(chatIsNotInclude)

    if (commandInstance) {
        ctx.reply(`Активные чаты:\n${ chatIsInclude.length == 0 ? "Пусто\n" : chatIsInclude.map((item, index) => {
            return `${index + 1}. ${item.chatId}\n` }).join('')
        }\nНеактивные чаты:\n${ chatIsNotInclude.length == 0 ? "Пусто\n" : chatIsNotInclude.map((item, index) => {
            return `${index + 1}. ${item.chatId}\n` }).join('')}` + 
            "\nДля добавления чатов введите addChat <айди чата из этого списка>")
    }

}

module.exports = chatSettingsHandler