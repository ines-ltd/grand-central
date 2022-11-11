const { User } = require('../../models')

describe('Users', () => {

  const data = [
    {
      firstName: 'Joshua',
      lastName: 'Haines',
      email: 'jh@ines.dev',
      password: 'spam'
    },
    {
      firstName: 'Darth',
      lastName: 'Vader',
      email: 'darth@empire.org',
      password: 'eggs'
    }
  ]

  beforeAll(() => {
    return Promise.all(data.map(u => User.create(u)))
  })

  afterAll(() => {
    return Promise.all(data.map(u => User.destroy({ where: { email: u.email } })))
  })

  test('should have first name, last name and email', async () => { 
    const user = await User.findOne({ where: { email: 'jh@ines.dev' } })
    expect(user.firstName).toBe('Joshua')
    expect(user.lastName).toBe('Haines')
    expect(user.email).toBe('jh@ines.dev')
  })

  test('should have an ein', async () => {
    const user = await User.findOne({ where: { email: 'jh@ines.dev' } })
    expect(user.ein).toBeTruthy()
  })

  test('should be able to manage eachother', async () => {
    const customer = await User.findOne({ where: { email: 'jh@ines.dev' } })
    const manager = await User.findOne({ where: { email: 'darth@empire.org' } })
    await customer.setManager(manager)
    expect(customer.managerEin).toBe(manager.ein)
  })

})
