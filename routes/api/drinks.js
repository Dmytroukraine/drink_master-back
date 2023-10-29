const express = require("express");
const {
  getMainPageDrinks,
  getDrinkById,
  addOwnDrink,
  removeOwnDrink,
  getOwnDrinks,
  addFavorite,
  removeFavorite,
  getByKeyWord,
} = require("../../controllers/drinks");

const {
  validateBody,
  authenticate,
  isValidDrinkId,
} = require("../../middlewares");

const { drinkJoiSchema } = require("../../models/cocktails");

const router = express.Router();

router.get("/own", authenticate, getOwnDrinks);

router.get("/mainpage", getMainPageDrinks);
router.get("/search", getByKeyWord);
router.get("/:drinkId", getDrinkById);

router.post(
  "/own/add",
  authenticate,
  validateBody(drinkJoiSchema),
  addOwnDrink
);

router.delete(
  "/own/remove/:drinkId",
  authenticate,
  isValidDrinkId,
  removeOwnDrink
);

router.post(
  "/favorite/add/:drinkId",
  authenticate,
  isValidDrinkId,
  addFavorite
);

router.delete(
  "/favorite/remove/:drinkId",
  authenticate,
  isValidDrinkId,
  removeFavorite
);

module.exports = router;
