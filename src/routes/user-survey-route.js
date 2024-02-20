const express = require("express");
const router = express.Router();
const userSurveyController = require("../controllers/user-survey-controller");
const authenticate = require("../middlewares/authenticate");
const { validateUserSurvey } = require("../middlewares/validator/validate-user-survey")

// CREATE USER SURVEY 
router.post("/users/:userId", authenticate, validateUserSurvey, userSurveyController.createUserSurvey);

// GET SURVEY RESULT FOR A USER 
router.get("/surveys/:surveyId/users/:userId", authenticate, validateUserSurvey, userSurveyController.getUserSurveyByUserId);

module.exports = router;