const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Subscription extends Model { }

Subscription.init({
subId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  subEvent: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subSchedule: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  requestId: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, { sequelize: db })

module.exports = Subscription
