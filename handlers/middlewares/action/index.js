const { Composer } = require('telegraf')

const feedback = new Composer()

const action = require('./action')

feedback.action('first', ctx => action(ctx, 0))
feedback.action('second', ctx => action(ctx, 1))
feedback.action('third', ctx => action(ctx, 2))
feedback.action('fourth', ctx => action(ctx, 3))

module.exports = feedback