const { Drink } = require("../../models/cocktails");
const { ctrlWrapper, HttpError } = require("../../utils");

const addFavorite = ctrlWrapper(async (req, res, next) => {
    const { drinkId } = req.params;
    const { id: userId } = req.user;
    const result = await Drink.findByIdAndUpdate(drinkId, {
      $push: { users: userId },
    });
    if (!result) {
   throw HttpError(404, "Not found");
 }
    res
      .status(200)
      .json({ message: "Drink is added to favorites" });
})

module.exports = addFavorite;