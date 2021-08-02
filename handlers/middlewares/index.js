const { Composer } = require('telegraf')

const middlewares = new Composer()

const photoHandler = require('./photo.js')
const addUpdate = require('./addUpdate.js')
const messageHandler = require('./messageText.js')
middlewares.on('photo', photoHandler)
middlewares.use(addUpdate)
middlewares.on('text', messageHandler)

module.exports = middlewares