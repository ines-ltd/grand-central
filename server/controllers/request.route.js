const express = require('express')
const router = express.Router()
const { Request } = require('../models')

router.get('/:id', async (req, res) => {
  console.log('Got a danged request!')
  const request = await Request.findByPk(req.params.id)
  console.log(request)
  if (!request) return res.sendStatus(404)
  return res.status(200).send(request)
})

module.exports = router
