const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class ProjectMap extends Model { }

ProjectMap.init({
  requestId: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  projectId: {
    type: DataTypes.NUMBER,
    allowNull: true
  }
}, { sequelize: db })

module.exports = ProjectMap
