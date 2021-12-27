const Admin = require('../../../../stores/context/admin')

const chatSettingsHandler = async ctx => {
    if (ctx.chat.type !== "private") return null

    var userMessage = ctx.message.text

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    const chatIsInclude = await Admin.getAdmin()

    if (commandInstance === '/addAdmin') {
        ctx.reply(`Админы ${chatIsInclude.length == 0 ? "Пусто\n" : "(Имя, айди):\n"
            + chatIsInclude.map((item, index) => {
                return `${index + 1}. ${item.user.username}, ${item.chatId}\n`
            }).join('')
            }` + "\nДля добавления админа, введите addAdmin <айди пользователя>")
    } else {
        // Admin.addAdmin(commandInstance)
        ctx.reply("Команда временно не работает!(")
    }

}

module.exports = chatSettingsHandler