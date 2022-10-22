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
    type: DataTypes.STRING
  },
  area: {
    type: DataTypes.STRING
  },
  level: {
    type: DataTypes.NUMBER
  }
}, { sequelize: db })

module.exports = Event
