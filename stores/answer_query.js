const Datastore = require('nedb-promise')

const AnswerCbQuery = new Datastore({ filename: 'data/AnswerCbQuery.db', autoload: true })

const isAnswerCbQueryValid = answerCbQuery => answerCbQuery.length === 4 ? true : false

const getOneAnswerCbQuery = (query = {}) => AnswerCbQuery.findOne(query)

const getAnswerCbQuery = (query = {}) => AnswerCbQuery.find(query)

const getCurrentAnswerCbQuery = () => AnswerCbQuery.find({ isSelect = true })

const addAnswerCbQuery = (answerCbQuery, isSelect = false) =>
    isAnswerCbQueryValid(answerCbQuery)
        ? AnswerCbQuery.insert({ AnswerCbQuery, isSelect }) : false

const updateCurrentAnswerCbQuery = (answerCbQuery) =>
    isAnswerCbQueryValid(answerCbQuery)
        ? AnswerCbQuery.update({ isSelect: true }, { $set: { answerCbQuery } }) : false

module.exports = {
    getOneAnswerCbQuery,
    getAnswerCbQuery,
    getCurrentAnswerCbQuery,
    addAnswerCbQuery,
    updateCurrentAnswerCbQuery
}