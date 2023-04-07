const Joi = require('joi')

const registerSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string()
  });

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required()
})


  module.exports = {
    registerSchema,
    loginSchema,
    verifyEmailSchema,
  }