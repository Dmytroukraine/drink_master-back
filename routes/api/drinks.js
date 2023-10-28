const express = require("express");
const {
  getMainPageDrinks,
} = require("../../controllers/drinks/getMainPageDrinks");

const router = express.Router();

router.get("/mainpage", getMainPageDrinks);

module.exports = router;
