const mongoose = require('mongoose')

const app = require('./app')

const { DB_HOST, PORT = 4000 } = process.env

mongoose.connect(DB_HOST)
.then(() => {
    console.log('Database is connected!')
    app.listen(PORT, (error) => {
        error ? console.log(error) : console.log(`listen PORT ${PORT}`)
    })
})
.catch(err => {
    console.log(err.message)
    process.exit(1)
})