const { Drink } = require("../../models/cocktails");
const { ctrlWrapper, HttpError } = require("../../utils");

const removeFavorite = ctrlWrapper(
  async (req, res, next) => {
    const { drinkId } = req.params;
    const { id: userId } = req.user;
    const result = await Drink.findByIdAndUpdate(drinkId, {
      $pull: { users: userId },
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    if (!result.users.includes(userId)) {
      res.status(409).json({
        message: "This drink is not in favorites",
      });
    } else {
      res.status(200).json({ message: "Drink deleted" });
    }
  }
);

module.exports = removeFavorite;
