const { Composer } = require('telegraf')
const { isAdminStart } = require('../middlewares/isAdminStart.js')

const commands = new Composer()

commands.start(isAdminStart, require('./start.js'))

commands.help(require('./help.js'))

commands.use(require('./settings/index'))

module.exports = commands