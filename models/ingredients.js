const { Schema, model } = require("mongoose");
const Joi = require("joi");

const ingredientSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ingredientThumb: {
    type: String,
    required: true,
  },
  "thumb-medium": {
    type: String,
    required: true,
  },
  "thumb-small": {
    type: String,
    required: true,
  },
  measurement: {
    type: String,
    required: true,
  },
});

const Ingredient = model("ingredient", ingredientSchema);

module.exports = { Ingredient, ingredientSchema };
