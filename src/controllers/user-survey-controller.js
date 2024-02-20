const catchError = require("../utils/catch-error");
const userSurveyService = require("../services/user-survey-service");
const createError = require("../utils/create-error");

exports.createUserSurvey = catchError(async (req, res, next) => {
    const { userSurveys } = req.body;

    for (el of userSurveys) {
        el.userId = +req.params.userId;
    }

    console.log(userSurveys);

    await userSurveyService.createUserSurvey(userSurveys);

    res.status(201).json({ message: "created user survey successfully" });
})

exports.getUserSurveyByUserId = catchError(async (req, res, next) => {

    const userSurveyResultForUser = await userSurveyService.findUserSurveyByUserId(+req.params.surveyId, +req.params.userId);

    res.status(201).json({ userSurveyResultForUser });
})