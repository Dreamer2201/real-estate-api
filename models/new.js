const {Schema, model} = require('mongoose')

const newSchema = new Schema({
    title: String,
    content: String,
    cover: String
})

const New = model('new', newSchema)

module.exports = New