const {Drink} = require("../../models/cocktails");
const { ctrlWrapper, HttpError } = require("../../utils");

const differenceInYears = require("date-fns/differenceInYears");

const addOwnDrink = ctrlWrapper(async (req, res, next) => {
    const { id: owner, birthDate } = req.user;

    const currentDate = new Date();
    const age = differenceInYears(currentDate, birthDate);

    if (age < 18) {
        throw HttpError(403, "Age is less than 18 years");
  }

  if (
    req.file){
    const result = await Drink.create({
      ...req.body,
      drinkThumb: req.file.path,
      owner,
    });
    return res.status(201).json(result);
  }

    const result = await Drink.create({
      ...req.body,
      owner,
    });
  
   res.status(201).json(result);
});

module.exports = addOwnDrink;


