const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const authenticate = require("../middlewares/authenticate");
const authAdmin = require("../middlewares/auth-admin");
const { validateUserId, validateUserBodyForEdit } = require("../middlewares/validator/validate-user")

// GET ALL USER
router.get("/", authenticate, authAdmin, userController.getAllUser);

// EDIT USER DATA
router.patch("/:userId",
    authenticate,
    authAdmin,
    validateUserId,
    validateUserBodyForEdit,
    userController.checkExistUser,
    userController.editUser
);

// DELETE (SOFT) USER
router.delete("/:userId",
    authenticate,
    authAdmin,
    validateUserId,
    userController.checkExistUser,
    userController.deletedUser
);

module.exports = router;