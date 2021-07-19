const Datastore = require('nedb-promise')

const User = new Datastore({ autoload: true, filename: "data/User.db" })

User.insureIndex({ fieldName: 'id', unique: true })

User.insureIndex({ fieldName: 'status' })

const getUser = user => User.findOne(user)

const admin = ({ id }) => User.update({ id }, { $set: { status: 'admin' } })

const getAdmins = () => User.find({ status: 'admin' })

const unadmin = ({ id }) => User.update({ id }, { $set: { status: 'member' } })

const isAdmin = (user) => {
    if (!user) return false
    if (user.status) return user.status === 'admin'
    return User.findOne({ id: user.id, status: 'admin' })
}

const ban = ({ id }) => User.update(
    { id, $not: { status: 'admin' } },
    { $set: { status: 'banned' } }
)

const unban = ({ id }) => User.update(
    { id },
    { $set: { status: 'member' } }
)

module.exports = {
    getAdmins,
    getUser,
    admin,
    unadmin,
    ban,
    unban
}