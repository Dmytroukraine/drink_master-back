const User = require("../models/users");

const updateUserNameAndAvatar = async (user, name, file) => {
  let updatedUser;
  if (!file) {
    updatedUser = await User.findByIdAndUpdate(
      user.id,
      { name },
      { new: true }
    ).select("-password");
    return updatedUser;
  }
  const avatarURL = file.path;
  updatedUser = await User.findByIdAndUpdate(
    user.id,
    {
      name,
      avatarURL,
    },
    { new: true }
  ).select("-password");
  return updatedUser;
};

module.exports = updateUserNameAndAvatar;
