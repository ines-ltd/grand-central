const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Event extends Model {}

Event.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  time: {
    type: DataTypes.DATE
  },
  ein: {
    type: DataTypes.UUID
  },
  area: {
    type: DataTypes.STRING
  },
  level: {
    type: DataTypes.STRING
  }
}, { sequelize: db })

module.exports = Event
