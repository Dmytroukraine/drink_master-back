const path = require("path");
const multer = require("multer");

const HttpError = require("../utils/HttpError");

const tempDir = path.join(__dirname, "../", "temp");
console.log(tempDir);

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cbk) => {
    cbk(null, file.originalname);
  },
});

const multerFilter = (req, file, cbk) => {
  if (file.mimetype.startsWith("image/")) {
    cbk(null, true);
  } else {
    cbk(HttpError(400, "Wrong file type! Only image file!"), false);
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: multerFilter,
});

module.exports = upload;
