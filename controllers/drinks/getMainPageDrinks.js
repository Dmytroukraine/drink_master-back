// const { ctrlWrapper, HttpError } = require("../../utils");
// const fs = require("fs/promises");
// const path = require("path");
// const differenceInYears = require("date-fns/differenceInYears");
// const { Drink } = require("../../models/cocktails");

// const drinkPath = path.resolve("db", "categories.json");

// const getMainPageDrinks = ctrlWrapper(async (req, res) => {
//   const { birthDate } = req.user;
//   const currentDate = new Date();
//   const age = differenceInYears(currentDate, birthDate);

//   const drinks = {};
//   const categories = await fs.readFile(drinkPath);
//   const parsedCategories = JSON.parse(categories);

//   for (const category of parsedCategories) {
//     drinks[category] = await Drink.find(
//       age < 18
//         ? {
//             category,
//             alcoholic: "Non alcoholic",
//           }
//         : { category }
//     )
//       .sort({ createdAt: -1 })
//       .limit(3);
//   }

//   res.json(drinks);
// });

// module.exports = getMainPageDrinks;

const { ctrlWrapper, HttpError } = require("../../utils");
const fs = require("fs/promises");
const path = require("path");
const { Drink } = require("../../models/cocktails");

const drinkPath = path.resolve("db", "categories.json");

const getMainPageDrinks = ctrlWrapper(async (req, res) => {
  const drinks = {};
  const categories = await fs.readFile(drinkPath);
  const parsedCategories = JSON.parse(categories);

  for (const category of parsedCategories) {
    drinks[category] = await Drink.find({ category })
      .sort({ createdAt: -1 })
      .limit(3);
  }

  res.json(drinks);
});

module.exports = getMainPageDrinks;
