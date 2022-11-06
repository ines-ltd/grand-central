const express = require('express')
const router = express.Router()
const { Request, User } = require('../models')
const { auth } = require('../middleware')

/**
 * Create
 */
router.post('/', auth, async (req, res) => {
  try {
    const request = await Request.create(req.body)
    await request.setOwner(req.user)
    // await req.user.addRequest(request)
    await request.addSubscriber(req.user)
    return res.status(201).send(request)
  } catch (error) {
    console.log(req.body)
    res.status(500).send(error)
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
    res.status(500).send(error)
  }
})

/**
 * Read all
 */
router.get('/', auth, async (req, res) => {
  try {
    const requests = await (req.user.role === 'customer' ? req.user.getRequests() : Request.findAll())
    return res.status(200).send(requests)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

/**
 * Update
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id, { include: 'owner' })

    if (!request) return res.sendStatus(404)
    if (req.user.ein !== request.owner.ein) return res.sendStatus(401)

    await request.update(req.body)
    return res.status(200).send(request)
  } catch (error) {
    res.status(500).send(error)
  }
})

/**
 * Delete
 */
 router.delete('/:id', auth, async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id, { include: 'owner' })
    if (!request) return res.sendStatus(404)
    if (req.user.ein !== request.owner.ein) return res.sendStatus(403)

    await request.destroy()
    return res.status(204).send(request)
  } catch (error) {
    res.status(500).send(error)
  }
})

/**
 * Subscribe
 */
router.post('/:id/subscribe', auth, async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id)
    if (!request) return res.sendStatus(404)
    await request.addSubscriber(req.user)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error)
  }
})

/**
 * Unsubscribe
 */
 router.delete('/:id/subscribe', auth, async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id)
    if (!request) return res.sendStatus(404)
    await request.removeSubscriber(req.user)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
