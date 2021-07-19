const Datastore = require('nedb-promise')

const Group = new Datastore({ autoload: true, filename: 'data/Group.db' })

Group.ensureIndex({
    fieldName: 'id',
    unique: true
})

const addGroup = group => {
    Group.update({ id: group.id }, group)
}

const listGroups = (query = {}) => {
    Group.find(query)
}

const removeGroup = ({ id }) => Group.remove(({ id }))

module.exports = {
    addGroup,
    removeGroup,
    listGroups
}