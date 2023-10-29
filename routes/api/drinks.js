const express = require("express");
const { getMainPageDrinks, getDrinkById } = require("../../controllers/drinks");

const addOwnDrink = require("../../controllers/drinks/addOwnDrink");
const removeOwnDrink = require("../../controllers/drinks/removeOwnDrink");


const {
  validateBody,
  authenticate,
  isValidDrinkId,
} = require("../../middlewares");
=======
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

    router.delete(
      "/own/remove/:drinkId",
      authenticate,
      isValidDrinkId,
      removeOwnDrink
    );

module.exports = router;
