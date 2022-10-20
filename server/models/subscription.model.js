const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Subscription extends Model { }

Event.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  event: {
    type: DataTypes.STRING
  }
}, { sequelize: db })

module.exports = Event
