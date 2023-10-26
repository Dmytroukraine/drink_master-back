const express = require("express");
const ctrl = require("../controllers/users");
const mdlw = require("../middlewares");

const router = express.Router();

router.get("/current", ctrl.getCurrentUser);

router.post("/subscribe", mdlw.isEmailBelongsToUser, ctrl.subscribe);

router.patch("/update", ctrl.updateUserData);

module.exports = router;
