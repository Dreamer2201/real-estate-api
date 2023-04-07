const {schemaHouse} = require('./shemaHouse')
const { registerSchema, loginSchema, updateSubscriptionSchema, verifyEmailSchema } = require('./schemaUser')

module.exports = {
    schemaHouse,
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
    verifyEmailSchema,
}