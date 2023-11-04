const Joi = require("joi");
const category = require("../db/categories.json");
const glass = require("../db/glasses.json");
const alco = require("../constants/alcoDrink");

const drinkJoiSchema = Joi.object({
  drink: Joi.string().min(2).max(30).required(),
  category: Joi.string()
    .valid(...category)
    .required(),
  alcoholic: Joi.string()
    .valid(...alco)
    .required(),
  glass: Joi.string()
    .valid(...glass)
    .required(),
  shortDescription: Joi.string().min(5).max(100).required(),
  instructions: Joi.string().min(10).max(1000).required(),
  drinkThumb: Joi.string(),
  ingredients: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      measure: Joi.string().required(),
      ingredientId: Joi.string().required(),
    })
  ),
  users: Joi.array().items(Joi.object()),
}).options({ abortEarly: false });

module.exports = drinkJoiSchema;