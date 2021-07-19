const ms = require('millisecond')
const { Telegraf } = require('telegraf')
const config = require('config')

const bot = new Telegraf(config.get('botToken'), {
    handlerTimeout: ms('5s'),
    telegram: { webhookReply: false }
})

module.exports = bot

Object.defineProperty(bot.context, "botInfo", {
    get() { return bot.botInfo }
})