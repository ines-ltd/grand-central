const auth = require('./auth.route')
const request = require('./request.route')
const user = require('./user.route')
const project = require('./project.route')

module.exports = {
  auth,
  user,
  request,
  project,
}
