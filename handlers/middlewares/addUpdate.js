const { addUpdates } = require('../../stores/logs/getUpdatesLog.js')

const addUpdate = async (ctx, next) => {
    console.log((await ctx.telegram.getUpdates())[0])
    addUpdates((await ctx.telegram.getUpdates())[0])
    return next()
}

module.exports = addUpdate