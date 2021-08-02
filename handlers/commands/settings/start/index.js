const { Composer } = require('telegraf')

const start = new Composer()

start.command('/updateStart', require('./updateStart'))
start.command('/addStart', require('./addStart'))
start.command('/showStarts', require('./showStarts'))
start.command('/deleteStart', require('./deleteStart'))
start.command('selectStart', require('./selectStart'))

module.exports = start