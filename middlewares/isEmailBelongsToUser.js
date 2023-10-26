const { HttpError } = require("../helpers");
const { User } = require("../models/users");

const isEmailBelongsToUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (email !== user.email) {
    throw HttpError(404, "Please, enter your email");
  }
  next();
};

module.exports = isEmailBelongsToUser;
