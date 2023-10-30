const { Drink } = require("../../models/cocktails");
const { ctrlWrapper, HttpError } = require("../../utils");

const getFavorite = ctrlWrapper(async (req, res, next) => {
  const { id: userId } = req.user;

  const result = await Drink.find({
    users: userId,
  },{users: 0});

  if (!result) {
    throw HttpError(404, "Not found");
  }
    res.status(200).json(result);

});

module.exports = getFavorite;
