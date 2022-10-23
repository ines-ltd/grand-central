const Event = require('./event.model')
const Update = require('./update.model')
const Request = require('./request.model')
const User = require('./user.model')
const Comment = require('./comment.model')
const Project = require('./project.model')

User.belongsTo(User, { as: 'manager' })

User.hasMany(Request)
Request.belongsTo(User, { as: 'owner' })

User.belongsToMany(Request, { through: 'Subscriptions' })
Request.belongsToMany(User, { as: 'subscriber', through: 'Subscriptions' })

module.exports = {
  Event,
  Update,
  Request,
  User,
  Comment,
  Project
}
