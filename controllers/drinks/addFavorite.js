const { Drink } = require("../../models/cocktails");
const { ctrlWrapper, HttpError } = require("../../utils");

const addFavorite = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const result = await Drink.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  if (result.users.includes(userId)) {
    res.status(409).json({
      message: "Drink already added to favorites",
    });
    
  } else {
    const drink = await Drink.findByIdAndUpdate(id, {
      $push: { users: userId },
    });
    res.status(200).json({ message: "Drink is added to favorites" });
  }
});

module.exports = addFavorite;
