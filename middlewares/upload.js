const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const uuid = require("uuid").v4;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const avatarName = `${uuid()}-${file.originalname}`;
    let folder;
    if (file.fieldname === "avatar") {
      folder = "avatars";
    } else if (file.fieldname === "cocktail") {
      folder = "cocktails";
    } else {
      folder = "others";
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],
      public_id: avatarName,
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700 },
      ],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
