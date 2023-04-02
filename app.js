const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const housesRouter = require('./routes/api/houses')

require('dotenv').config()



const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/houses', housesRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
  })
  
  app.use((err, req, res, next) => {
    const {status = 500, message = "Server error"} = err
    res.status(status).json({message})
  })

  module.exports = app