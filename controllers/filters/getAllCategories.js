const { Drink } = require("../../models/cocktails");
const { ctrlWrapper} = require("../../utils");

const getAllCategories = ctrlWrapper(async (req, res) => {
    const categories = await Drink.distinct("category");
    res.status(200).json(categories)
});

module.exports = getAllCategories