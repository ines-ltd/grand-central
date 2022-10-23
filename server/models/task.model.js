const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Task extends Model { }

Task.init({
  taskId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  taskName: {
    type: DataTypes.STRING
  },
  ownerEin: {
    type: DataTypes.NUMBER
  },
  delegateEin: {
    type: DataTypes.NUMBER
  },
  rollbackReason: {
    type: DataTypes.STRING
  },
  taskStatus: {
    type: DataTypes.STRING
  },
  taskOpenDt: {
    type: DataTypes.DATE
  },
  taskCloseDt: {
    type: DataTypes.DATE
  }

}, { sequelize: db })

module.exports = Task
