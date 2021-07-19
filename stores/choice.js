const Datastore = require('nedb-promise')

const Choice = new Datastore({ autoload: true, filename: 'data/Choice.db' })

const getLength = choice => (JSON.stringify(choice).match(/callback_data/g)).length

const addChoices = (choices, isSelect = false) => {
    const length = getLength(choices)
    if (length > 4 || length < 4) {
        return false
    }
    return Choice.insert({ choices, isSelect })
}

const getChoices = (query = {}) => Choice.find(query)

const getCurrentChoices = () => Choice.findOne({ isSelect: true })

const updateCurrentChoices = newChoices => {
    const length = getLength(newChoices)
    if (length > 4 || length < 4) {
        return false
    }
    return Choice.update({ isSelect: true }, { $set: { choices: newChoices } })
}

const removeChoices = (_id) => Choice.remove(_id)

module.exports = {
    addChoices,
    getChoices,
    getCurrentChoices,
    updateCurrentChoices,
    removeChoices
}