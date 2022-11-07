const express = require('express')
const cors = require('cors')
const router = require('./controllers')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/ping', (req, res) => {
  res.send({
    msg: 'PONG ' + new Date()
  })
})

for (let [route, handler] of Object.entries(router)) {
  app.use('/' + route, handler)
}

function serve (port) {
  app.listen(port, () => void console.log(`Server listening on port ${port}`))
}

serve(5000)
