const { Schema, model } = require("mongoose");
const alco = require("../constants/alcoDrink");
const category = require('../db/categories.json');
const glass = require('../db/glasses.json');
const { handleMongooseError } = require("../helpers");

const ingredientSchema = new Schema(
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
  { _id: false }
);

const drinkSchema = new Schema(
  {
    drink: {
      type: String,
      required: [true, "Set name for a drink"],
      unique: [true, "Name in use"],
    },
    category: {
      type: String,
      enum: category,
      required: [true, "Set category for a drink"],
    },
    alcoholic: {
      type: String,
      enum: alco,
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

    drinkThumb: {
      type: String,
      default: "",
    },

    ingredients: [
      ingredientSchema
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { versionKey: false }
);



drinkSchema.post("save", (error, data, next) => {
  const { name, code } = error;
  const status =
    name === "MongoServerError" && code === 11000
      ? 409
      : 400;
  if (name === "MongoServerError" && code === 11000) {
    error.message = "Drink already exists ";
  }
  error.status = status;

  next();
});

const Drink = model("recipe", drinkSchema);

module.exports = { Drink };
