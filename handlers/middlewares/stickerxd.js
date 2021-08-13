const stickerHandler = ctx => {
    if (ctx.chat.type !== 'private') return null
    // ctx.replyWithSticker(ctx.update.message.sticker.file_id)
    ctx.reply(ctx.update.message.sticker.emoji)
}

module.exports = stickerHandler