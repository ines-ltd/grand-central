const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Increment extends Model { }

Increment.init({
  incrementId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  projectId: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  incrementEcd: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, { sequelize: db })

module.exports = Increment
