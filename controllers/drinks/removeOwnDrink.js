const { Drink } = require("../../models/cocktails");
const { ctrlWrapper, HttpError } = require("../../utils");

const removeOwnDrink = ctrlWrapper(
  async (req, res, next) => {
    const { id } = req.params;
    const { id: userId } = req.user;

    const drink = await Drink.findById(id);
    if (!drink) {
      throw HttpError(404, "Not found");
    }

    if (!drink.owner) {
      throw HttpError(403, "You are not the owner");
    }
        const ownerStrId = drink.owner.toString();
    
        if (ownerStrId !== userId) {
          throw HttpError(403, "You are not the owner");
        }

        const result = await Drink.findByIdAndDelete(id);

        res.status(200).json({ message: "drink deleted" });
  }
);

module.exports = removeOwnDrink;
