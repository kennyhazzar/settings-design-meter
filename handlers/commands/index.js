const { Composer } = require('telegraf')

const commands = new Composer()

commands.start(require('./start.js'))

commands.help(require('./help.js'))

commands.use(require('./settings/index'))

module.exports = commands