const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/logs/Message.db' })
const Message = nedbPromise.fromInstance(db)

/**
 * {"user":{"firstName":"Дмитрий","lastName":"Колчанов","username":"kennyhazzar"},"messageId":1200,"chatId":314595610,"username":"kennyhazzar","_id":"f4vUDxgmxxLJEhpB"}
 * 
 */

/**
 * Функция для очищения Таблицы от последствий кривой nedb и ее remove, insert
 */
const compactDb = () => db.persistence.compactDatafile()
/**
 * Возвращает сообщение по айди конкретного сообщения из чата
 * Производит поиск по локальной бд  
 */
const getMessageById = messageId => Message.findOne({ messageId })

const getMessageOne = (query = {}) => Message.findOne(query)

const getMessage = (query = {}) => Message.find(query)

const pushMessage = context => Message.insert({ context })

const removeMessageDataById = messageId => {
    Message.remove({ messageId })
    compactDb()
}

module.exports = {
    getMessage,
    getMessageById,
    getMessageOne,
    pushMessage,
    removeMessageDataById
}

