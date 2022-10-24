const express = require('express')
const router = express.Router()
const { Request, User } = require('../models')

/**
 * Create
 */
router.post('/', async (req, res) => {
  try {
    const ein = req.headers.authorization.split(' ')[1]
    const request = await Request.create(req.body)
    const user = await User.findByPk(ein)
    await request.setOwner(user)
    await request.addSubscriber(user)
    return res.status(201).send(request)
  } catch (error) {
    res.status(500).send({ error })
  }
})

/**
 * Read
 */
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id, { include: 'owner' })
    if (!request) return res.sendStatus(404)
    return res.status(200).send(request)
  } catch (error) {
    res.status(500).send({ error })
  }
})

/**
 * Update
 */
router.put('/:id', async (req, res) => {
  try {
    const ein = req.headers.authorization.split(' ')[1]
    const request = await Request.findByPk(req.params.id, { include: 'owner' })
    if (!request) return res.sendStatus(404)
    if (ein !== request.owner.ein) return res.sendStatus(401)
    await request.update(req.body)
    return res.status(200).send(request)
  } catch (error) {
    res.status(500).send({ error })
  }
})

/**
 * Delete
 */
 router.delete('/:id', async (req, res) => {
  try {
    const ein = req.headers.authorization.split(' ')[1]
    const request = await Request.findByPk(req.params.id, { include: 'owner' })
    if (!request) return res.sendStatus(404)
    if (ein !== request.owner.ein) return res.sendStatus(401)
    await request.destroy()
    return res.status(204).send(request)
  } catch (error) {
    res.status(500).send({ error })
  }
})

module.exports = router
