const express = require("express");
const { getAllGlasses } = require("../../controllers/glass/getAllglasses");
const { getIngredients } = require("../../controllers/filters/ingredients");
const { authenticate } = require("../../middlewares/index.js");

const router = express.Router();

router.get("/glasses", authenticate, getAllGlasses);
router.get("/ingredients", authenticate, getIngredients);

module.exports = router;
