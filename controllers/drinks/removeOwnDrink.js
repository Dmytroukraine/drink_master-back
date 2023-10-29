const { Drink } = require("../../models/cocktails");
const { findByIdAndRemove } = require("../../models/users");
const { ctrlWrapper, HttpError } = require("../../utils");

const removeOwnDrink = ctrlWrapper(
  async (req, res, next) => {
    const { drinkId } = req.params;
    const { id } = req.user;

    const { owner } = await Drink.findById(drinkId);
    if (!owner) {
      throw HttpError(404, "Not found");
    }
    const ownerId = owner.toString();

    if (ownerId !== id) {
      throw HttpError(403, "You are not the owner");
    }

    const result = await Drink.findByIdAndDelete(drinkId);

    res.status(200).json({ message: "drink deleted" });
  }
);

module.exports = removeOwnDrink;
