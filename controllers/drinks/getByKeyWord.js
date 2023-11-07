const { ctrlWrapper, HttpError } = require("../../utils");
const differenceInYears = require("date-fns/differenceInYears");
const { Drink } = require("../../models/cocktails");

const getByKeyWord = ctrlWrapper(async (req, res) => {
  const { category, ingredient, query, page = 1, limit = 10 } = req.query;
  const { birthDate } = req.user;

  const skip = (page - 1) * limit;
  const currentDate = new Date();
  const age = differenceInYears(currentDate, birthDate);
  const queryConfig = {};

  category && (queryConfig.category = category);
  ingredient &&
    (queryConfig.ingredients = { $elemMatch: { title: ingredient } });
  query && (queryConfig.drink = { $regex: query, $options: "i" });

  if (age < 18) {
    queryConfig.alcoholic = "Non alcoholic";
  }

  const total = await Drink.countDocuments(queryConfig);

  const drinks = await Drink.find(queryConfig, null, { skip, limit }).sort({
    createdAt: -1,
  });

  if (!total) {
    throw HttpError(404, "No results found");
  }

  res.json({ total, drinks });
});

module.exports = getByKeyWord;
