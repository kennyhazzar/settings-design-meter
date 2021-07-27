const bot = require('./bot')

bot.use(
    require('./handlers/commands'),
    require('./handlers/middlewares')
)

// bot.middleware()

try {
    bot.launch()
} catch (error) {
    console.log(error)
}