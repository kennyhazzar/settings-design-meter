const { getAdmin, addAdmin } = require('../../stores/context/admin')

const isAdminStart = async (ctx, next) => {

    if (ctx.chat.type !== 'private') return null

    const admins = await getAdmin()

    if (admins.length == 0) {
        await addAdmin(ctx?.chat, ctx?.chat.id)
        ctx.reply("Так как админов нет, вы им стали! Продолжайте пользоваться приложением:)")
        return next(ctx)
    }

    return next(ctx)
}

module.exports = { isAdminStart }