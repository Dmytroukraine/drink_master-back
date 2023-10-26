const sendEmail = require("../../helpers/sendEmail");
const { User } = require("../../models/users");

const getCurrentUser = (req, res) => {
  res.status(200).json({
    message: "Success",
    user: req.user,
  });
};

const subscribe = async (req, res) => {
  const { email } = req.body;
  await sendEmail(email);
  res.status(200).json({
    message: "Email is sent",
  });
};

const updateUserData = async (req, res, next) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(201).json({
    message: "Success",
    user: updatedUser,
  });
};

module.exports = {
  getCurrentUser,
  subscribe,
  updateUserData,
};
