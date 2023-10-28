const express = require("express");
const ctrl = require("../controllers/users");
const mdlw = require("../middlewares");

const router = express.Router();

router.get("/current", mdlw.authenticate, ctrl.getCurrentUser);

router.post(
  "/subscribe",
  mdlw.authenticate,
  mdlw.isEmailBelongsToUser,
  ctrl.subscribe
);

router.patch(
  "/update",
  mdlw.authenticate,
  mdlw.upload.single("avatar"),
  ctrl.updateUserData
);

module.exports = router;
