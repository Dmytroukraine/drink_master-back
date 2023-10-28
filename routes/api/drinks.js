const express = require("express");
const {
  getMainPageDrinks,
} = require("../../controllers/drinks/getMainPageDrinks");

const addOwnDrink = require("../../controllers/drinks/addOwnDrink");

const {
  validateBody,
  authenticate,
} = require("../../middlewares");

const {
  drinkJoiSchema,
} = require("../../models/cocktails");

const router = express.Router();

router.get("/mainpage", getMainPageDrinks);

router.post(
  "/own/add",
  authenticate,
  validateBody(drinkJoiSchema),
  addOwnDrink
);

module.exports = router;
