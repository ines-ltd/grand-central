const db = require('./db')

const {
  User,
  Request,
  Project,
  Scrape
} = require('../models/index')

const { choose } = require('../utils')

const data = require('./seed.data')

async function seed () {

  await db.sync({ force: true })

  // create the data
  const users = await User.bulkCreate(data.users)
  const requests = await Request.bulkCreate(data.requests)
  const projects = await Project.bulkCreate(data.projects)
  const scrape = await Scrape.bulkCreate(data.scrape)

  // get the users by type
  const customers = users.filter(u => u.role === 'customer')
  const devs = users.filter(u => u.role === 'dev')
  const managers = users.filter(u => u.role === 'manager')
  const admins = users.filter(u => u.role === 'admin')

  // set some managers
  for (let user of [...customers, ...devs]) {
    await user.setManager(choose(managers))
  }
  
  // set owners of requests
  for (let request of requests) {
    const owner = choose(customers)
    await request.setOwner(owner)
    await request.addSubscriber(owner)
  }

  // add some subscribers
  for (let request of requests) {
    await request.addSubscribers(choose(customers, Math.floor(Math.random() * 10)))
  }

  // attach requests to projects
  for (let request of requests) {
    await request.addProject(choose(projects))
  }

}

if (process.argv.includes('seed')) seed()

module.exports = seed
