const AnswerQuery = require('../../../../stores/context/answerCbQuery.js')

const { Composer, Scenes: { BaseScene, Stage }, Markup, Scenes } = require('telegraf')

const exitKeyboard = Markup.keyboard(['Прервать']).oneTime().resize(true)
const removeKeyboard = Markup.removeKeyboard()

const settingUpdateQueryScene = new BaseScene('settingUpdateQueryScene')

var templateCount = 0

settingUpdateQueryScene.enter(ctx => {
    ctx.session.template = []
    ctx.reply("Данной командой вы можете изменить текущий шаблон уведомлений, которые" +
        "будут отображаться при нажатии на inline-клавиатуру", exitKeyboard)
})
settingUpdateQueryScene.on("text", ctx => {

    const text = ctx.update.message.text

    templateCount++

    if (text == "Прервать") return ctx.scene.leave()

    if (templateCount < 4) {
        ctx.reply(`Добавлено ${templateCount} из 4`)
        return ctx.session.template.push(text)
    }

    ctx.session.template.push(text)

    ctx.reply(`Осталось ${templateCount} из 4`)

    return ctx.scene.leave()
})

settingUpdateQueryScene.leave(ctx => {
    templateCount = 0

    if (ctx.session.template.length != 4) return ctx.reply('Ошибка сохранения - шаблон не из 4 слов')

    AnswerQuery.updateCurrentAnswerCbQuery(ctx.session.template)

    ctx.reply(`Обновленный шаблон:\n${ctx.session.template.map((item, index) => {
        return `${index + 1}. ${item}\n`
    }).join('')}\nШаблон обновлен.`)
}, removeKeyboard)

const stage = new Stage([settingUpdateQueryScene])

const updateAnswerCbQueryComposer = new Composer()

updateAnswerCbQueryComposer.use(stage.middleware())

updateAnswerCbQueryComposer.command('updateQuery', ctx => ctx.scene.enter("settingUpdateQueryScene"))

module.exports = updateAnswerCbQueryComposer
