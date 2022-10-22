const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class User extends Model { }

User.init({
  ein: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ouc: {
    type: DataTypes.STRING
  }
}, { sequelize: db })

module.exports = User
