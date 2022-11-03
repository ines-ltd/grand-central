require('dotenv').config()
const bcrypt = require('bcryptjs')
const basic = require('basic-auth')
const express = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { auth } = require('../middleware')

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('Welcome to the auth route')
})

router.post('/signup', async (req, res) => {
  const { name: email, pass: password } = basic(req)
  const user = await User.create({ ...req.body, email, password })
  res.status(201).send(createTokens(user))
})

router.post('/signin', async (req, res) => {

  const { name: email, pass: password } = basic(req)

  const user = await User.findOne({  where: { email } })
  if (!user) return res.status(404).send({ msg: 'User not found.' })

  const result = await bcrypt.compare(password, user.password)
  if (!result) return res.status(401).send({ msg: 'Incorrect password.' })

  res.status(200).send({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    ein: user.ein,
    role: user.role,
    ...createTokens(user)
  })
})

router.get('/verify', auth, (req, res) => {
  res.status(200).send(req.user)
})

function createTokens (user) {

  const payload = (({ email, ein }) => ({ email, ein }))(user)
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' })
  const refresh = jwt.sign(payload, process.env.REFRESH_SECRET)

  return { token, refresh }

}

module.exports = router
