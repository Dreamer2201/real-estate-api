const {Schema, model} = require("mongoose")

const houseSchema = new Schema({
    title: String,
    total_area: String,
    imgs: Array,
    bedrooms_quantity: Number,
    holl: String,
    living_room: String,
    kitchen: String,
    wardrobe: String,
    bathroom_quantity: Number,
    terrace: String,
    garage: String,
})

const House = model('house', houseSchema)

module.exports = House