const User = require("../models/users");
const { HttpError } = require("../utils");

const isEmailBelongsToUser = async (req, res, next) => {
  const email = req.body.email;
  console.log(req.user);

  const user = await User.findOne({ email });
  if (!user) {
    return next(HttpError(404, "Not found"));
  }
  console.log(user);
  if (email !== user.email) {
    throw HttpError(404, "Please, enter your email");
  }
  next();
};

module.exports = isEmailBelongsToUser;
