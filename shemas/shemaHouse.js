const Joi = require('joi')

const schemaHouse = Joi.object({
    title: Joi.string().required(),
    total_area: Joi.string().required(),
    bedrooms_quantity: Joi.number().required(),
    holl: Joi.string().required(),
    living_room: Joi.string().required(),
    kitchen: Joi.string().required(),
    wardrobe: Joi.string().required(),
    bathroom_quantity: Joi.number().required(),
    terrace: Joi.string().required(),
    garage: Joi.string().required(),
  });

 
  module.exports = {
    schemaHouse
  }