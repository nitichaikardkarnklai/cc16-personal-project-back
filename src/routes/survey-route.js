const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/survey-controller");
const authenticate = require("../middlewares/authenticate");
const authAdmin = require("../middlewares/auth-admin");
const { validateSurvey } = require("../middlewares/validator/validate-survey");

// CREATE SURVEY 
router.post("/", authenticate, authAdmin, validateSurvey, surveyController.createSurveyForm);

// EDIT SURVEY by id

// GET ALL SURVEY - not use...

// GET NOT START SURVEY
router.get("/not-start", authenticate, authAdmin, surveyController.getNotStartSurvey);

// GET ONGOING SURVEY
router.get("/ongoing", authenticate, authAdmin, surveyController.getOngoingSurvey);

// GET FINISHED SURVEY
router.get("/finished", authenticate, authAdmin, surveyController.getFinishedSurvey);


// DELETE SURVEY

module.exports = router;