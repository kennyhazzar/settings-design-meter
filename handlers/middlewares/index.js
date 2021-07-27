const { Composer } = require('telegraf')

const middlewares = new Composer()

const photoHandler = require('./photo.js')
const addUpdate = require('./addUpdate.js')

middlewares.on('photo', photoHandler)
middlewares.use(addUpdate)

module.exports = middlewares