const express = require("express");
const { getMainPageDrinks, getDrinkById } = require("../../controllers/drinks");

const addOwnDrink = require("../../controllers/drinks/addOwnDrink");

const { validateBody, authenticate } = require("../../middlewares");

const { drinkJoiSchema } = require("../../models/cocktails");

const router = express.Router();

router.get("/mainpage", getMainPageDrinks);
router.get("/:id", getDrinkById);

router.post(
  "/own/add",
  authenticate,
  validateBody(drinkJoiSchema),
  addOwnDrink
);

module.exports = router;
