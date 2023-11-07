const User = require("../models/users");
const { HttpError } = require("../utils");
const ctrlWrapper = require("../utils/ctrlWrapper");

const isEmailBelongsToUser = async (req, res, next) => {
  const email = req.body.email;

  const user = await User.findOne({ email });
  if (!user) {
    return next(HttpError(404, "Not found"));
  }
  if (email !== req.user.email) {
    return next(HttpError(404, "Please, enter your email"));
  }

  next();
};

module.exports = ctrlWrapper(isEmailBelongsToUser);
