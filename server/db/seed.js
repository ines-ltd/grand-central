const db = require('./db')

const {
  User
} = require('../models/index')

const data = require('./seed.data')

async function seed () {

  await db.sync({ force: true })

  const users = await Promise.all(data.users.map(u => User.create(u)))

  const josh = await User.create({
    firstName: "Josh",
    lastName: "Haines",
    email: "jh@ines.com"
  })

  await users[0].setManager(josh)


}

seed()

module.exports = seed

