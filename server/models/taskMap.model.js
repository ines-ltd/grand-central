const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class TaskMap extends Model { }

TaskMap.init({
  taskId : {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  projectId: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  requestId: {
    type: DataTypes.NUMBER,
    allowNull: true
  }
}, { sequelize: db })

module.exports = TaskMap
