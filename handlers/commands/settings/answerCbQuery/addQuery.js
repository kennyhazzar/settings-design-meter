const { getCallbackData } = require('../../../../helpers')

const AnswerQuery = require('../../../../stores/context/answerCbQuery.js')

const { Composer, Scenes: { BaseScene, Stage }, Markup, Scenes } = require('telegraf')

const exitKeyboard = Markup.keyboard(['Прервать']).oneTime().resize(true)
const removeKeyboard = Markup.removeKeyboard()

const settingAddQueryScene = new BaseScene('settingAddQueryScene')

var templateCount = 0

settingAddQueryScene.enter(ctx => {
    ctx.session.template = []
    ctx.reply("Данной командой вы можете изменить текст уведомления, которое" +
        "будет отображаться при нажатии на inline-клавиатуру", exitKeyboard)
})
settingAddQueryScene.on("text", ctx => {

    const text = ctx.update.message.text

    templateCount++

    if (text == "Прервать") return ctx.scene.leave()
    if (templateCount < 4) {
        ctx.reply(`Добавлено ${templateCount} из 4`)
        return ctx.session.template.push({ text: text, callback_data: getCallbackData(templateCount) })
    }
    ctx.session.template.push({ text: text, callback_data: getCallbackData(templateCount) })
    ctx.reply(`Осталось ${templateCount} из 4`)
    return ctx.scene.leave()
})

settingAddQueryScene.leave(ctx => {
    templateCount = 0

    if (ctx.session.template.length != 4) return ctx.reply('Ошибка сохранения - шаблон не из 4 слов')
    AnswerQuery.addAnswerCbQuery(ctx.session.template)
    ctx.reply(`Сохраненный шаблон:\n${ctx.session.template.map((item, index) => {
        return `${index + 1}. ${item.text}\n`
    }).join('')}\nДля выбора шаблона воспользуйтесь командой /selectQuery`)
}, removeKeyboard)

const stage = new Stage([settingAddQueryScene])

const addAnswerCbQueryComposer = new Composer()

addAnswerCbQueryComposer.use(stage.middleware())

addAnswerCbQueryComposer.command('addQuery', ctx => ctx.scene.enter("settingAddQueryScene"))

module.exports = addAnswerCbQueryComposer
