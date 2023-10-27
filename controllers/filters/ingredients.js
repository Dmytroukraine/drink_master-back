const { Ingredient } = require("../../models/ingredients");
const { HttpError, ctrlWrapper } = require("../../utils");

const getIngredients = async (req, res) => {
  const ingredients = await Ingredient.find().sort({ title: 1 });

  if (!ingredients) {
    throw HttpError(404, "Sorry, there are no ingredients to display");
  }
  res.json(ingredients);
};

module.exports = { getIngredients: ctrlWrapper(getIngredients) };
