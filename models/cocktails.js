const { Schema, model } = require("mongoose");
const Joi = require("joi");

const category = require('../db/categories.json')
const glass = require('../db/glasses.json')
const ingredients = require("../db");

const alco = ["Alcoholic", "Non alcoholic"];

const drinkSchema = new Schema(
  {
    drink: {
      type: String,
      required: [true, "Set name for a drink"],
    },
    category: {
      type: String,
      enum: category,
      required: [true, "Set category for a drink"],
    },
    alcoholic: {
      type: String,
      enum: ["Alcoholic", "Non alcoholic"],
      required: [true, "Set type of drink"],
    },
    glass: {
      type: String,
      enum: glass,
      required: [true, "Set glass for a drink"],
    },

    shortDescription: {
      type: String,
      required: [true, "Set description for the drink"],
    },

    instructions: {
      type: String,
      required: [true, "Set instructions for the drink"],
    },

    ingredients: [
      {
        title: {
          type: String,
          required: [true, "Set name for a ingredient"],
        },
        measure: {
          type: String,
          required: [true, "Set measure"],
        },

        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: "ingredients",
        },
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const drinkJoiSchema = Joi.object({
  drink: Joi.string().min(2).max(30).required(),
  category: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
  alcoholic: Joi.string()
    .valid("Alcoholic", "Non alcoholic")
    .required(),
  glass: Joi.string()
    .valid(...glass)
    .required(),
  shortDescription: Joi.string().min(5).max(100).required(),
  instructions: Joi.string().min(10).max(1000).required(),
  ingredients: Joi.array().items(Joi.object({
    title: Joi.string().required,
    measure: Joi.string().required,
    // ingredientId: Joi.string().required,
  })),
}).options({ abortEarly: false });

drinkSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const Drink = model("recipes", drinkSchema);

module.exports = { Drink, drinkJoiSchema };
