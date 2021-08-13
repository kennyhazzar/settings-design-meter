const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')


const db = new Datastore({ autoload: true, filename: 'data/context/Choice.db' })
const Choice = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const isChoiceValid = choice =>
    (JSON.stringify(choice).match(/callback_data/g)).length === 4 ? true : false

const addChoices = (choices, isSelect = false) => {
    if (!isChoiceValid(choices)) {
        return false
    }
    return Choice.insert({ choices, isSelect })
}

const getChoices = (query = {}) => Choice.find(query)

const getCurrentChoices = () => Choice.findOne({ isSelect: true })

const getChoicesOne = (query = {}) => Choice.findOne(query)

const updateCurrentChoices = newChoices => {
    if (!isChoiceValid(newChoices)) {
        return false
    }
    Choice.update({ isSelect: true }, { $set: { choices: newChoices } })
    compactDb()
}

const changeCurrentChoices = idNewCurrent => {
    Choice.update(
        { isSelect: true },
        { $set: { isSelect: false } }
    )
    Choice.update({ _id: idNewCurrent }, { $set: { isSelect: true } })
    compactDb()
}

const removeChoices = (_id) => {
    Choice.remove({ _id })
    compactDb()
}

module.exports = {
    getChoices,
    getCurrentChoices,
    getChoicesOne,
    addChoices,
    updateCurrentChoices,
    changeCurrentChoices,
    removeChoices
}