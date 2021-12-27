const { getAdmin } = require('../../stores/context/admin')

const isAdmin = async (ctx, next) => {

    if (ctx.chat.type !== 'private') return null

    const admins = await getAdmin()

    if (!admins.find(admin => admin.chatId == ctx.chat.id)) {
        return ctx.reply("У вас нету доступа к этой команде!")
    }

    next(ctx)
}

module.exports = { isAdmin }