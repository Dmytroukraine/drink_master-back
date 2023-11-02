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
  getPopular
} = require("../../controllers/drinks");

const {
  validateBody,
  authenticate,
  isValidDrinkId,
  upload,
  parseJson
} = require("../../middlewares");

const { drinkJoiSchema } = require("../../models/cocktails");

const router = express.Router();



router.get("/own", authenticate, getOwnDrinks);
router.get("/popular", authenticate, getPopular);
router.get("/mainpage", getMainPageDrinks);
router.get("/search", getByKeyWord);
router.get("/favorite", authenticate, getFavorite);
router.get("/:drinkId", getDrinkById);


router.post(
  "/own/add",
  authenticate,
  upload.single("cocktail"),
  parseJson,
  validateBody(drinkJoiSchema),
  addOwnDrink
);

router.delete(
  "/own/remove/:drinkId",
  authenticate,
  isValidDrinkId,
  removeOwnDrink
);

router.get(
  "/favorite",
  authenticate,
  getFavorite
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
