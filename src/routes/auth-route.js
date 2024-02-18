const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const { validateRegister, validateLogin } = require("../middlewares/validator/validate-auth");
const authenticate = require("../middlewares/authenticate");

// REGISTER
router.post("/register", validateRegister, authController.register);

// LOGIN
router.post("/login", validateLogin, authController.login);

// ME
router.get("/me", authenticate, authController.getMe);

module.exports = router;