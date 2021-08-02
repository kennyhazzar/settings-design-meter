const { Composer } = require('telegraf')

const middlewares = new Composer()

middlewares.on('photo', require('./photo.js'))

middlewares.use(require('./addUpdate.js'))

middlewares.on('text', require('./messageText.js'))

middlewares.on('sticker', require('./stickerxd.js'))

module.exports = middlewares