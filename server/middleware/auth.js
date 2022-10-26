const { User } = require('../models')
const jwt = require('jsonwebtoken')

async function auth (req, res, next) {

  try {

    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.sendStatus(400)

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    if (!decoded) return res.sendStatus(403)

    const user = await User.findByPk(decoded.ein, { attributes: { exclude: ['password'] } })
    if (!user) return res.sendStatus(404)

    req.user = user
    next()
    
  } catch (err) {
    return res.status(500).send(err)
  }

}

module.exports = auth
