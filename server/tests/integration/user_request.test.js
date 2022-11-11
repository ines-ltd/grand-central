const { User, Request } = require('../../models')

describe('For users and requests', () => {

  const users = [
    {
      firstName: 'Simon',
      lastName: 'Haines',
      email: 'sh@ines.dev',
      password: 'spam'
    },
    {
      firstName: 'Luke',
      lastName: 'Skywalker',
      email: 'luke@rebels.net',
      password: 'eggs'
    }
  ]

  const requests = [
    {
      name: 'Dog report',
      description: 'Some info on all the dogs',
      category: 'defcon 3',
      rationale: 'We think they are awesome',
      audience: 'Crufts',
      urgency: 'Low',
      status: 'hungry'
    }
  ]

  beforeAll(() => {
    return Promise.all([
      ...users.map(u => User.create(u)),
      ...requests.map(r => Request.create(r))
    ])
  })

  afterAll(() => {
    return Promise.all([
      ...users.map(u => User.destroy({ where: { email: u.email } })),
      ...requests.map(r => Request.destroy({ where: { name: r.name } }))
    ])
  })

  test('a user should be able to own a request', async () => { 
    const owner = await User.findOne({ where: { email: users[0].email } })
    const request = await Request.findOne({ where: { name: requests[0].name } })
    await request.setOwner(owner)
    expect(request.ownerEin).toBe(owner.ein)
  })

  test('many users should be able to subscribe to a request', async () => {
    const u1 = await User.findOne({ where: { email: users[0].email } })
    const u2 = await User.findOne({ where: { email: users[1].email } })
    const request = await Request.findOne({ where: { name: requests[0].name } })
    await request.addSubscriber(u1)
    await request.addSubscriber(u2)
    const subs = await request.getSubscriber()
    expect(subs.length).toBe(2)
  })

})
