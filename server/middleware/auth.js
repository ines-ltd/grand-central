const { User } = require('../models')

async function auth (req, res, next) {

  const ein = req.headers.authorization?.split(' ')[1]
  if (!ein) return res.status(401).send('invalid auth')

  const user = await User.findByPk(ein)
  if (!user) return res.status(401).send('user not found')

  req.user = user
  next()

}

module.exports = auth
