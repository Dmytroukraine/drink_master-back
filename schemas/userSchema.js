const Joi = require("joi");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  birthDate: Joi.date().required().messages({
    "any.required": "missing required birthDate field",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Please enter a valid email! e.g. user@mail.com",
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required password field",
  }),
}).options({ abortEarly: false });

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
}).options({ abortEarly: false });

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

module.exports = schemas;
