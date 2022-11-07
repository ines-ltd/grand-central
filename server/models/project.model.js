const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Project extends Model { }

Project.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  holdReason: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  },
  quickWin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priorityScore: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  platform: {
    type: DataTypes.STRING
  },
  wireframe: {
    type: DataTypes.STRING
  },
  moscow: {
    type: DataTypes.STRING
  },
  userStory: {
    type: DataTypes.STRING
  },
  wireFrameSkip: {
    type: DataTypes.BOOLEAN
  },
  moscowSkip: {
    type: DataTypes.BOOLEAN
  },
  userStorySkip: {
    type: DataTypes.BOOLEAN
  },
  ecd: {
    type: DataTypes.DATE
  },
  milestone: {
    type: DataTypes.STRING
  },
  incrementCount: {
    type: DataTypes.INTEGER
  },
  timeboxPerIncCount: {
    type: DataTypes.INTEGER
  },
  timeBoxLength: {
    type: DataTypes.STRING
  }

}, { sequelize: db })

module.exports = Project
