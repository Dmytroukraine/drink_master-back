const { ctrlWrapper, HttpError } = require("../../utils");
const { Drink } = require("../../models/cocktails");

const getDrinkById = ctrlWrapper(async (req, res) => {
  const { drinkId } = req.params;
  const drinkById = await Drink.findById(drinkId);

  if (!drinkById) {
    throw HttpError(404, "Not Found");
  }

  res.json(drinkById);
});

module.exports = getDrinkById;
