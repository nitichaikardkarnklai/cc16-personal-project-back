const express = require("express");
const router = express.Router();
const userSurveyController = require("../controllers/user-survey-controller");
const authenticate = require("../middlewares/authenticate");
const { validateUserSurvey } = require("../middlewares/validator/validate-user-survey")

// CREATE USER SURVEY 
router.post("/users/:userId", authenticate, validateUserSurvey, userSurveyController.createUserSurvey);

// GET SURVEY RESULT FOR A USER 
router.get("/surveys/:surveyId/users/:userId", authenticate, validateUserSurvey, userSurveyController.getUserSurveyByUserId);

// GET AVG SCORE (AND COUNT DO SURVEY) OF SURVEY DATA ===> FINISHED STAGE
router.get("/average", authenticate, userSurveyController.getUserSurveyAVG);

// GET COUNT DO SURVEY OF SURVEY DATA ===> ONGOING STAGE
router.get("/count", authenticate, userSurveyController.getCountUserSurvey);

module.exports = router;