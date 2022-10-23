const express = require('express')
const router = express.Router()
const { Request } = require('../models')

router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id)
    if (!request) return res.sendStatus(404)
    return res.status(200).send(request)
  } catch (error) {
    res.status(500).send({ error })
  }
})

module.exports = router
