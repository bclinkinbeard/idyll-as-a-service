const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const idyll = require('idyll')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.set('x-powered-by', false)
app.set('json spaces', 2)

app.post('/', (req, res) => {
  idyll({
    inputString: req.body.src,
    output: 'tmp',
    minify: false,
    debug: true,
    compilerOptions: {spellcheck: false}
  })
  .once('update', (output) => {
    res.json(output)
  })
  .build(req.body.src)
})

app.listen(process.env.PORT || 3001, () => {
  console.log('Idyll as a service, at your service!')
})
