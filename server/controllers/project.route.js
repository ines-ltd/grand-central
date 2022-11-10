const express = require('express')
const { auth } = require('../middleware')
const { User, Project } = require('../models')

const router = express.Router()

router.get('/', auth, async (req, res) => {
  const projects = await Project.findAll({
    include: { model: User, as: 'developers' }
  })
  res.status(200).send(projects)
})

module.exports = router
