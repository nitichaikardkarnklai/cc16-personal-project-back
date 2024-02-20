const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/survey-controller");
const authenticate = require("../middlewares/authenticate");
const authAdmin = require("../middlewares/auth-admin");
const { validateCreateSurvey, validateEditSurvey } = require("../middlewares/validator/validate-survey");

// CREATE SURVEY 
router.post("/", authenticate, authAdmin, validateCreateSurvey, surveyController.createSurveyForm);

// EDIT SURVEY by id
router.patch("/:surveyId/", authenticate, authAdmin, validateEditSurvey, surveyController.editSurveyForm);

// GET ALL SURVEY - not use...

// GET NOT START SURVEY
router.get("/not-start", authenticate, surveyController.getNotStartSurvey);

// GET ONGOING SURVEY
router.get("/ongoing", authenticate, surveyController.getOngoingSurvey);

// GET FINISHED SURVEY
router.get("/finished", authenticate, surveyController.getFinishedSurvey);

// DELETE SURVEY
router.delete("/:surveyId", authenticate, authAdmin, surveyController.removeSurvey);

// GET SURVEY WHICH A USER NOT FINISH SURVEY YET
router.get("/not-finish/users/:userId", authenticate, surveyController.getNotFinishedSurveyForUser);

// GET SURVEY WHICH A USER ALREADY DONE SURVEY
router.get("/finished/users/:userId", authenticate, surveyController.getDoneSurveyForUser);

module.exports = router;