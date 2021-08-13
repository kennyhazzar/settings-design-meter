const { Composer } = require('telegraf')

const query = new Composer()

query.use(require('./addQuery.js'))

query.command("selectQuery", require('./selectQuery.js'))

module.exports = query