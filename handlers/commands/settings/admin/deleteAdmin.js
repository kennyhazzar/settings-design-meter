const Admin = require('../../../../stores/context/admin.js')

const deleteAdminHandler = async ctx => {
    if (ctx.chat.type !== 'private') return null

    var userMessage = ctx.message.text

    const start = await Admin.getAdmin()

    const commandInstance = userMessage.substring(userMessage.search(' '), userMessage.length).trim()

    if (commandInstance === '/deleteAdmin') {

        ctx.replyWithHTML(`Список админов:\n(пользователь, айди)\n
        ${start.length == 0 ? "Пусто\n" : start.map((item, index) => {
            return "\n" + `${index + 1}. ${item.user.username}\n<strong>${item._id}</strong>\n`
        }).join('')}\n\nДля удаления админа, введи /deleteAdmin &lt;айди из списка&gt;`)
    } else {
        Admin.removeAdmin(commandInstance)
        ctx.reply("Админ удален")
    }
}

module.exports = deleteAdminHandler