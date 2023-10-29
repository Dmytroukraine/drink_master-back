const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../utils");

const isValidDrinkId = (req, res, next) => {
  const { drinkId } = req.params;
  if (!isValidObjectId(drinkId)) {
    next(HttpError(400, `${drinkId} is not valid id`));
  }
  next();
};

module.exports = isValidDrinkId;
