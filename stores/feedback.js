const Datastore = require('nedb-promise')

const Feedback = new Datastore({ autoload: true, filename: 'data/Feedback.db' })

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
    return Feedback.update({ isSelect: true }, { $set: { choices: newFeedback } })
}


module.exports = {
    isFeedbackValid,
    addFeedback,
    getCurrentFeedback,
    getFeedback,
    getFeedbackOne,
    updateCurrentFeedback
}