const ms = require('millisecond')
const { session, Telegraf } = require('telegraf')

const config = require('config')

const bot = new Telegraf(config.get('botToken'), {
    handlerTimeout: ms('5s'),
    telegram: { webhookReply: false }
})

bot.use(session())

module.exports = bot

Object.defineProperty(bot.context, "botInfo", {
    get() { return bot.botInfo }
})