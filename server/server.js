const express = require('express')
const cors = require('cors')
const { auth, request } = require('./controllers')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/ping', (req, res) => {
  res.send({
    msg: 'PONG ' + new Date()
  })
})

app.use('/request', request)
app.use('/auth', auth)

function serve (port) {
  app.listen(port, () => void console.log(`Server listening on port ${port}`))
}

serve(5000)
