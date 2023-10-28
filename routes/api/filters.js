const express = require("express");
const { getAllGlasses } = require("../../controllers/filters/getAllglasses");
const { getIngredients } = require("../../controllers/filters/ingredients");
const  getAllCategory = require("../../controllers/filters/getAllCategories")
const { authenticate } = require("../../middlewares/index.js");

const router = express.Router();

router.get("/glasses", authenticate, getAllGlasses);
router.get("/ingredients", authenticate, getIngredients);
router.get("/categories", authenticate, getAllCategory);

module.exports = router;
