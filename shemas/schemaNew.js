const Joi = require('joi')

const schemaNew = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
})

module.exports = {
    schemaNew
}