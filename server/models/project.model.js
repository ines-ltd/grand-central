const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')

class Project extends Model { }

Project.init({
  projectId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  holdReason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quickWin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priorityScore: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false
  },
  wireframe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  moscow: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userStory: {
    type: DataTypes.STRING,
    allowNull: false
  },
  wireFrameSkip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  moscowSkip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userStorySkip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projectEcd: {
    type: DataTypes.DATE,
    allowNull: false
  },
  milestone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  incrementCount: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  timeboxPerIncCount: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  timeBoxLength: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, { sequelize: db })

module.exports = Project
