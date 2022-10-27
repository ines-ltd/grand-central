const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Action extends Model { }

Action.init({
  actionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  timeboxId: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  storyPoints: {
    type: DataTypes.NUMBER,    
    allowNull: false
  },
  moscow: {
    type: DataTypes.STRING,    
    allowNull: false
  },
  parentId: {
    type: DataTypes.NUMBER,    
    allowNull: false
  }

}, { sequelize: db })

module.exports = Action
