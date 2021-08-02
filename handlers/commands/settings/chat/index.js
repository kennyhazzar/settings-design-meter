const { Composer } = require('telegraf')

const chat = new Composer

chat.command('/chatAdd', require('./chatAdd.js'))

module.exports = chat