const { Composer } = require('telegraf')
const { isAdmin } = require('../../middlewares/isAdmin')

const settings = new Composer(isAdmin)

settings.use(require('./chat/index'))

settings.use(require('./start/index'))

settings.use(require('./text/index'))

settings.use(require('./answerCbQuery/index'))

settings.use(require('./admin/index'))

module.exports = settings