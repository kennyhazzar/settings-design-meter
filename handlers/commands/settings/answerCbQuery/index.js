const { Composer } = require('telegraf')

const query = new Composer()

query.use(require('./addQuery.js'))

query.use(require('./updateQuery.js'))

query.command("selectQuery", require('./selectQuery.js'))

query.command("queryHelp", require('./queryHelp.js'))

query.command("deleteQuery", require('./deleteQuery.js'))

query.command("showQueries", require('./showQueries.js'))

module.exports = query