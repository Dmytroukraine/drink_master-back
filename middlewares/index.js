const isEmptyBody = require("./isEmptyBody");
const authenticate = require("./authenticate");
const isValidDrinkId = require("./isValidDrinkId");
const validateBody = require("./validateBody");
const upload = require("./upload");
const parseJson = require("./parseJson");
const isEmailBelongsToUser = require("./isEmailBelongsToUser");

module.exports = {
  isEmptyBody,
  authenticate,
  isValidDrinkId,
  validateBody,
  upload,
  parseJson,
  isEmailBelongsToUser,
};
