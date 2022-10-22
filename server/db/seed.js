const db = require('./db')

const {
  User
} = require('../models/index')

const data = require('./seed.data')

async function seed () {

  await db.sync({ force: true })

  const users = await Promise.all(data.users.map(u => User.create(u)))

}

seed()

module.exports = seed
