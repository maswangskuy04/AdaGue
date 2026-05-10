const Sequelize = require('sequelize')
const sequelize = require('../config/db')

const db = {}

db.User = require('./User')(sequelize, Sequelize.DataTypes)
db.Match = require('./Match')(sequelize, Sequelize.DataTypes)
db.Conversation = require('./Conversation')(sequelize, Sequelize.DataTypes)
db.Message = require('./Message')(sequelize, Sequelize.DataTypes)

Object.values(db).forEach(model => {
    if (model.associate) model.associate(db)
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db