const { Drink } = require("../../models/cocktails");
const { ctrlWrapper, HttpError } = require("../../utils");

const getPopular = ctrlWrapper(async (req, res, next) => {
  const result = await Drink.aggregate([
    { $sort: { users: -1 } },
    { $limit: 5 },
  ]);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

module.exports = getPopular;




