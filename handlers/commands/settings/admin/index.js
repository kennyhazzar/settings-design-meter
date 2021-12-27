const { Composer } = require('telegraf')

const admin = new Composer()

admin.command('/addAdmin', require('./addAdmin.js'))
admin.command('/deleteAdmin', require('./deleteAdmin.js'))

module.exports = admin