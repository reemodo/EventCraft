const express = require("express");
const router = express.Router();
const authController = require("../collections-manager/authCollManager");


router.post("/signup", authController.signUp);

router.post("/signup/verify", authController.verifyOtp);

router.post("/signin", authController.signIn);

router.post("/signin/verify", authController.verifyLogin);

module.exports = router;