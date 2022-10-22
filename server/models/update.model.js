const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Update extends Model { }

Update.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  }
}, { sequelize: db })

module.exports = Update
