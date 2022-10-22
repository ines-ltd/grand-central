const Event = require('./event.model')
const Update = require('./update.model')
const Request = require('./request.model')
const User = require('./user.model')
const Comment = require('./comment.model')
const Project= require('./project.model')

// 1. User -- 1. Manager
User.belongsTo(User, { as: 'manager', foreignKey: 'managerId' })

console.log('Associations created!')

module.exports = {
  Event,
  Update,
  Request,
  User,
  Comment,
  Project
}
