const { Composer } = require('telegraf')

const commands = new Composer()

const start = require('./start.js')
const help = require('./help.js')
const chat = require('./settings/chats.js')

commands.command('/chat', chat)
commands.start(start)
commands.help(help)

module.exports = commands