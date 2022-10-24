const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Request extends Model { }

Request.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  progress: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rationale: {
    type: DataTypes.STRING,
    allowNull: false
  },
  audience: {
    type: DataTypes.STRING
  },
  urgency: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
}, { sequelize: db })

module.exports = Request
