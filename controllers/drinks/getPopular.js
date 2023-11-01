const { Drink } = require("../../models/cocktails");
const { ctrlWrapper, HttpError } = require("../../utils");
const differenceInYears = require("date-fns/differenceInYears");

const getPopular = ctrlWrapper(async (req, res, next) => {
  const { birthDate } = req.user;

  const currentDate = new Date();
  const age = differenceInYears(currentDate, birthDate);

  if (age < 18) {
    const result = await Drink.aggregate([
      {
        $match: {
          users: { $exists: true },
          alcoholic: "Non alcoholic",
        },
      },
      {
        $project: {
          drink: 1,
          shortDescription: 1,
          drinkThumb: 1,
          users: { $size: "$users" },
        },
      },
      { $sort: { users: -1 } },
      { $limit: 4 },
    ]);

    return res.status(200).json(result);
  }

  const result = await Drink.aggregate([
    {
      $match: {
        users: { $exists: true },
      },
    },
    {
      $project: {
        drink: 1,
        shortDescription: 1,
        drinkThumb: 1,
        users: { $size: "$users" },
      },
    },
    { $sort: { users: -1 } },
    { $limit: 4 },
  ]);
  res.status(200).json(result);
});

module.exports = getPopular;
