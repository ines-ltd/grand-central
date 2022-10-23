const db = require('./db')

const {
  User,
  Request
} = require('../models/index')

const data = require('./seed.data')

async function seed () {

  await db.sync({ force: true })

  const users = await Promise.all(data.users.map(u => User.create(u)))
  const requests = await Promise.all(data.requests.map(r => User.create(r)))

  await users[0].setManager(users[1])
  
  await requests[0].setOwner(users[0])
  await Promise.all(users.map(u => request[0].addSubscriber(u)))

}

seed()

module.exports = seed

