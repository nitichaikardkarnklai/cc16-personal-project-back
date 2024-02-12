const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../middlewares/validator/validate-auth");

// REGISTER
router.post("/register", validateRegister, authController.register);

// LOGIN
router.post("/login", validateLogin, authController.login);

module.exports = router;