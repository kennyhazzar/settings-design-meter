const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/context/Chat.db' })
const Chat = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const getChatOne = (query = {}) => Chat.findOne(query)

const getChat = (query = {}) => Chat.find(query)

const addChat = (chatId) => Chat.insert({ chatId })

const removeChat = (_id) => {
    Chat.remove({ _id })
    compactDb()
}

module.exports = {
    getChat,
    getChatOne,
    addChat,
    removeChat
}