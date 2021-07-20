const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/Feedback.db' })
const Feedback = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const isFeedbackValid = feedback => feedback.length === 4 ? true : false

const getFeedbackOne = (query = {}) => Feedback.findOne(query)

const getFeedback = (query = {}) => Feedback.find(query)

const getCurrentFeedback = () => Feedback.findOne({ isSelect: true })

const addFeedback = (feedback, isSelect = false) => {
    if (!isFeedbackValid(feedback)) {
        return false
    }
    return Feedback.insert({ feedback, isSelect })
}
const updateCurrentFeedback = newFeedback => {
    if (!isFeedbackValid(newFeedback)) {
        return false
    }
    Feedback.update({ isSelect: true }, { $set: { choices: newFeedback } })
    compactDb()
}

const changeFeedback = idNewFeedback => {
    Feedback.update(
        { isSelect: true },
        { $set: { isSelect: false } }
    )
    Feedback.update({ _id: idNewFeedback }, { $set: { isSelect: true } })
    compactDb()
}

const removeFeedback = _id => Feedback.remove(_id)

module.exports = {
    getCurrentFeedback,
    getFeedback,
    getFeedbackOne,
    addFeedback,
    updateCurrentFeedback,
    changeFeedback,
    removeFeedback
}