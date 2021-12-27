const Datastore = require('nedb')
const nedbPromise = require('nedb-promise')

const db = new Datastore({ autoload: true, filename: 'data/context/Admin.db' })
const Admin = nedbPromise.fromInstance(db)

const compactDb = () => db.persistence.compactDatafile()

const getAdminOne = (query = {}) => Admin.findOne(query)

const getAdmin = (query = {}) => Admin.find(query)

const addAdmin = (user, chatId) => Admin.insert({ user, chatId })

const removeAdminByAdminId = (query = {}) => {
    Admin.remove(query)
    compactDb()
}

const removeAdmin = (_id) => {
    Admin.remove({ _id })
    compactDb()
}

module.exports = {
    getAdmin,
    getAdminOne,
    addAdmin,
    removeAdmin,
    removeAdminByAdminId
}