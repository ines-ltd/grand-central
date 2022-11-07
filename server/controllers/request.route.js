const express = require('express')
const router = express.Router()
const { Request, User, Project } = require('../models')
const { auth } = require('../middleware')
const { Op } = require('sequelize')

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
 * Bulk delete
 */
router.post('/delete', auth, async (req, res) => {
  try {
    if (!(['manager', 'admin'].includes(req.user.role))) return res.sendStatus(403)
    if (!req.body.requests) return res.sendStatus(400)
    await Request.destroy({
      where: {
        id: { [Op.in]: req.body.requests.map(r => r.id) }
      }
    })
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 * Assign
 */
router.post('/assign', auth, async (req, res) => {
  if (!req.user.role === 'manager' && !req.user.role === 'admin') res.sendStatus(403)

  const project = await Project.create({ name: 'Created a project', priorityScore: 3, quickWin: true })
  const requests = await Request.findAll({ where: { id: { [Op.in]: req.body.requests } } })
  const devs = await User.findAll({ where: { ein: { [Op.in]: req.body.devs  } } })
  
  await project.addRequests(requests)
  await project.addDevelopers(devs)
  await Request.update({ status: 'Assigned' }, { where: { id: { [Op.in]: req.body.requests } } })

  res.sendStatus(200)
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
