const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Timebox extends Model { }

Timebox.init({
  timeBoxId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  incrementId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timeBoxEcd: {
    type: DataTypes.DATE,
    allowNull: false
  },
  timeBoxLength: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, { sequelize: db })

module.exports = Timebox
