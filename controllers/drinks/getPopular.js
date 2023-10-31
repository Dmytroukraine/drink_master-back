const { Drink } = require("../../models/cocktails");
const { ctrlWrapper, HttpError } = require("../../utils");
const differenceInYears = require("date-fns/differenceInYears");

const getPopular = ctrlWrapper(async (req, res, next) => {
  const { birthDate } = req.user;

  const currentDate = new Date();
  const age = differenceInYears(currentDate, birthDate);

  if (age < 18) {

// const pipeline = [
// 		{
// 			'$match': {
// 				"usersId": { $exists: true }
// 			}
// 		},
// 		{
// 			$project: {
// 				"drink": 1,
// 				"instructions": 1,
// 				"drinkThumb": 1,
// 				"usersId": 1,
// 				"users_count": { $size: "$usersId" }
// 			}
// 		},
// 		{ $sort: { "users_count": -1 } }, {
// 			'$limit': 4
// 		}
// 	]

// 	const result = await Recipe.aggregate(pipeline);



    const result = await Drink.aggregate([
      // {
      //   $cond: {
      //     if: { users: { $exists: true } },
      //     then:
      //   }
      // },
      // { users: { $exists: true } },
        { $match: { users: { $exists: true }, alcoholic: "Non alcoholic" } },
        { $sort: { users: -1 } },
        { $limit: 4 },
      ]);
     res.status(200).json(result);
  };

  const result = await Drink.aggregate([
    { $sort: { users: -1 } },
    { $limit: 4 },
  ]);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

module.exports = getPopular;




