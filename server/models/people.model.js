const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class People extends Model { }

People.init({
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
    type: DataTypes.STRING,
    allowNull: false
  },
  mgrEin: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  mgFirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mgrLastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mgrEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mgrEmail: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, { sequelize: db })

module.exports = People
