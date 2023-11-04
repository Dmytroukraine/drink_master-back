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
  getFavorite,
  getPopular,
} = require("../../controllers/drinks");

const {
  validateBody,
  authenticate,
  isValidId,
  upload,
  parseJson,
} = require("../../middlewares");

const drinkJoiSchema = require("../../schemas/drinkSchema");

const router = express.Router();

router.get("/own", authenticate, getOwnDrinks);
router.get("/popular", authenticate, getPopular);
router.get("/mainpage", authenticate, getMainPageDrinks);
router.get("/search", authenticate, getByKeyWord);
router.get("/favorite", authenticate, getFavorite);
router.get("/:id", authenticate, getDrinkById);

router.post(
  "/own/add",
  authenticate,
  upload.single("cocktail"),
  parseJson,
  validateBody(drinkJoiSchema),
  addOwnDrink
);

router.delete(
  "/own/remove/:id",
  authenticate,
  isValidId,
  removeOwnDrink
);

router.get("/favorite", authenticate, getFavorite);

router.post(
  "/favorite/add/:id",
  authenticate,
  isValidId,
  addFavorite
);

router.delete(
  "/favorite/remove/:id",
  authenticate,
  isValidId,
  removeFavorite
);

module.exports = router;
