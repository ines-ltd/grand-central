const db = require('./db')

const {
  User,
  Request,
  Project,
  Scrape
} = require('../models/index')

const data = require('./seed.data')

async function seed () {

  await db.sync({ force: true })

  // create the data
  const users = await Promise.all(data.users.map(u => User.create(u)))
  const requests = await Promise.all(data.requests.map(r => Request.create(r)))
  const projects = await Promise.all(data.projects.map(p => Project.create(p)))
  const scrape = await Promise.all(data.scrape.map(s => Scrape.create(s)))

  // make a user manage another
  await users[0].setManager(users[1])
  
  // let a user own a request
  await requests[0].setOwner(users[0])
  // and let one all subscribe to the request
  await requests[0].addSubscriber(users[2])

  // attach a project to a request
  await requests[0].addProject(projects[0])

}

seed()

module.exports = seed

