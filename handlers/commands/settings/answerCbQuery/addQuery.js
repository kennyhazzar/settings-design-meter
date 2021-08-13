const AnswerQuery = require('../../../../stores/context/answerCbQuery.js')

const { Composer,  Scenes: { BaseScene, Stage }, Markup, Scenes  } = require('telegraf')

const exitKeyboard = Markup.keyboard(['Прервать']).oneTime().resize(true)
const removeKeyboard = Markup.removeKeyboard()

const settingScene = new BaseScene('settingScene')

var templateCount = 0

settingScene.enter(ctx => {
    ctx.session.template = []
    ctx.reply("Настройка коллбек-ответа", exitKeyboard)
})
settingScene.on("text", ctx => {

    const text = ctx.update.message.text

    templateCount++

    if (text == "Прервать") return ctx.scene.leave()
    if (templateCount < 4) {
        ctx.reply(`Осталось ${templateCount} из 4`)
        return ctx.session.template.push(text)
    }
    ctx.session.template.push(text)
    ctx.reply(`Осталось ${templateCount} из 4`)
    return ctx.scene.leave()
})

settingScene.leave(ctx => {
    templateCount = 0

    if (ctx.session.template.length != 4) return ctx.reply('Ошибка сохранения - шаблон не из 4 слов')
    AnswerQuery.addAnswerCbQuery(ctx.session.template)
    ctx.reply(`Сохраненный шаблон:\n${ctx.session.template.map((item, index) => {
        return `${index + 1}. ${item}\n`
    }).join('')}\nДля выбора шаблона воспользуйтесь командой /selectQuery`)
}, removeKeyboard)

const stage = new Stage([settingScene])

const answerCbQueryComposer = new Composer()

answerCbQueryComposer.use(stage.middleware())

answerCbQueryComposer.command('addQuery', ctx => ctx.scene.enter("settingScene"))

module.exports = answerCbQueryComposer
