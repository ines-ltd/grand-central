const express = require('express')
const router = express.Router()
const { User } = require('../models')
const { auth } = require('../middleware')

router.get('/', auth, async (req, res) => {
  const users = await User.findAll({
    where: req.query,
    attributes: { exclude: ['password'] }
  })
  res.status(200).send(users)
})

module.exports = router
