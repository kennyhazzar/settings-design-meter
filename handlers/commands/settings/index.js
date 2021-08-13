const { Composer } = require('telegraf')

const settings = new Composer()

settings.use(require('./chat/index'))

settings.use(require('./start/index'))

settings.use(require('./text/index'))

settings.use(require('./answerCbQuery/index'))

module.exports = settings