const bot = require('./bot')

bot.use(require('./handlers'))

try {
    bot.launch()
} catch (error) {
    console.log(error)
}