const { Drink } = require("../../models/cocktails");
const { ctrlWrapper, HttpError } = require("../../utils");

const getOwnDrinks = ctrlWrapper(async (req, res, next) => {
  const { id: owner } = req.user;

  const result = await Drink.find({ owner });

  if (!result.length) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

module.exports = getOwnDrinks;
