const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Scrape extends Model { }

Scrape.init({
  ein: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  forename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.DATE,
    allowNull: false
  },
  emailAddress: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  ouc: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  mgrEin: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  mgrForename: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  mgrSurname: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  mgrEmailAddress: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  mgrOuc: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
  

}, { sequelize: db })

module.exports = Scrape
