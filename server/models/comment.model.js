const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Comment extends Model { }

Comment.init({
  commentId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commentDt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  commentEin: {
    type: DataTypes.NUMBER,
    allowNull: false
  }

}, { sequelize: db })

module.exports = Comment
