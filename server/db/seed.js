const db = require('./db')
const { Event } = require('../models/index')

async function seed () {

  await db.sync({ force: true })

  const event = await Event.create({
    ein: 123,
    time: new Date(),
    area: 'fity-one',
    level: 9000
  })

}

seed()

module.exports = seed
