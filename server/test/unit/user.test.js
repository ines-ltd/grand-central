const _jest = require('jest')
const { User } = require('../../models')
const db = require('../../db/db')

describe('Users', () => {

  const data = [
    {
      firstName: 'Joshua',
      lastName: 'Haines',
      email: 'jh@ines.dev'
    },
    {
      firstName: 'Darth',
      lastName: 'Vader',
      email: 'darth@empire.org'
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
    expect(customer.managerId).toBe(manager.ein)
  })

})
