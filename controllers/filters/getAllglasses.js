const fs = require("fs/promises");
const path = require("path");
const ctrlWrapper = require("../../utils/ctrlWrapper");

const glassesPath = path.resolve("db", "glasses.json");

const getAllGlasses = async (req, res) => {
  const data = await fs.readFile(glassesPath);
  const parsedData = JSON.parse(data).sort();
  res.json(parsedData);
};

module.exports = { getAllGlasses: ctrlWrapper(getAllGlasses) };
