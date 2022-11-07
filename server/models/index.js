const Event = require('./event.model')
const Update = require('./update.model')
const Request = require('./request.model')
const User = require('./user.model')
const Comment = require('./comment.model')
const Project = require('./project.model')
const People = require('./people.model')
const Task = require('./task.model')
const Increment = require('./increment.model')
const Timebox = require('./timebox.model')
const Subscription = require('./subscription.model')
const Action = require('./action.model')
const Scrape = require('./scrape.model')

User.belongsTo(User, { as: 'manager' })

User.hasMany(Request, { foreignKey: 'ownerEin' })
Request.belongsTo(User, { as: 'owner' })

User.belongsToMany(Project, { through: 'Developer_Project' })
Project.belongsToMany(User, { as: 'developers', through: 'Developer_Project' })

User.belongsToMany(Request, { as: 'subscriptions', through: 'Subscriptions' })
Request.belongsToMany(User, { as: 'subscribers', through: 'Subscriptions' })

Request.belongsToMany(Project, { through: 'Project_Request' })
Project.belongsToMany(Request, { through: 'Project_Request' })

Request.hasMany(Comment)
Project.hasMany(Comment)
Task.hasMany(Comment)
Increment.hasMany(Comment)
Timebox.hasMany(Comment)

module.exports = {
  Event,
  Update,
  Request,
  User,
  Comment,
  Project,
  People,
  Task,
  Increment,
  Timebox,
  Subscription,
  Action,
  Scrape
}
