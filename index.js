const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const uuid = require('uuid/v4')

const idyll = require('idyll')
if (!fs.existsSync('tmp')) fs.mkdirSync('tmp')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use('/preview', express.static('tmp'))

app.set('x-powered-by', false)
app.set('json spaces', 2)

const handleRequest = (req, res) => {
  const input = req.method === 'GET' ? req.query : req.body
  if (!input.src) res.send('East does it, you need to send a `src` property!')

  const id = req.cookies.id || uuid()
  if (!req.cookies.id) res.cookie('id', id)

  idyll({
    output: path.join('tmp', id),
    minify: input.minify ? input.minify === 'true' : false,
    debug: true,
    compilerOptions: {spellcheck: false}
  })
  .once('update', (output) => {
    res.json(output)
  })
  .build(input.src)
}

app.get('/', handleRequest)
app.post('/', handleRequest)

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Idyll as a service, at your service on port ${port}!`)
})
