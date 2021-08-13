const commandString = [
    { title: "addQuery", description: "Добавление нового шаблона" },
    { title: "deleteQuery", description: "Удаление шаблона" },
    { title: "selectQuery", description: "Выбор текущего шаблона" },
    { title: "showQueries", description: "Информация о всех шаблонах" },
    { title: "updateQuery", description: "Обновление сообщения текущего шаблона" },
]

const queryHelpHandler = ctx => {
    if (ctx.chat.type !== 'private') return null

    ctx.reply("Привет! Данными командами ты имеешь возможность изменить уведомление сверху экрана!\n" +
        "\nЧтобы узнать, как пользоваться командой, просто воспользуйся ей без параметров.\n" +
        "\n\nСписок команд:\n" + `${commandString.map((item, index) => {
            return `\n${index + 1}. /${item.title} - ${item.description}\n`
        }).join('')}`)
}

module.exports = queryHelpHandler