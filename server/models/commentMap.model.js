const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class CommentMap extends Model { }

CommentMap.init({
  taskId: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  requestId: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  projectId: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  commentId: {
    type: DataTypes.NUMBER,
    allowNull: true
  }
}, { sequelize: db })

module.exports = CommentMap
