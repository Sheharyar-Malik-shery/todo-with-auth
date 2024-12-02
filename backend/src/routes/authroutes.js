const {
  registeruser,
  loginuser,
  logout,
} = require("../controllers/authController.js");
const validation = require("../middlewares/authvalidation.js");
const validationlogin = require("../middlewares/loginvalidation.js");
const express = require("express");

const router = express.Router();

router.post("/register", validation, registeruser);
router.post("/login", validationlogin, loginuser);
router.post("/logout", logout);
// router.post("/login", login);

module.exports = router;
