const { addUpdates } = require('../../stores/logs/getUpdatesLog.js')
const { addChat, removeChatByChatId } = require('../../stores/context/chat.js')
const addUpdate = async (ctx, next) => {
    const update = (await ctx.telegram.getUpdates())[0]
    addUpdates(update)
    if (update?.message?.group_chat_created == true) {
        console.log(update?.message?.chat.id)
        addChat({ chat: update?.message?.chat }, update?.message?.chat.id, true)
    }
    if (update?.my_chat_member?.new_chat_member?.status == 'left' ||
        update?.my_chat_member?.old_chat_member?.status == 'left') {
        const deletedChatId = update?.my_chat_member?.chat?.id
        console.log(deletedChatId)
        removeChatByChatId({ chatId: deletedChatId })
    }
    return next()
}

module.exports = addUpdate