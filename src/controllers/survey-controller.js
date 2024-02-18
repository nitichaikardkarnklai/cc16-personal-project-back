const catchError = require("../utils/catch-error");
const surveyService = require("../services/survey-service");
const createError = require("../utils/create-error");

exports.createSurveyForm = catchError(async (req, res, next) => {
    const surveyObj = req.body;

    const existTitle = await surveyService.findSurveyByTitle(surveyObj.title);
    if (existTitle) {
        createError("survey title is existence", 400);
    }

    // console.log(JSON.stringify(surveyObj, null, 4));

    const surveyObjPrisma = { ...surveyObj, questions: {} };

    for (let i = 0; i < surveyObj.questions.length; i++) {
        if (i == 0) { surveyObjPrisma.questions.create = []; }
        surveyObjPrisma.questions.create[i] = { ...surveyObj.questions[i] };
        surveyObjPrisma.questions.create[i].ratings = {};
        for (let j = 0; j < surveyObj.questions[i].ratings.length; j++) {
            if (j == 0) { surveyObjPrisma.questions.create[i].ratings.create = []; }
            surveyObjPrisma.questions.create[i].ratings.create[j] = { ...surveyObj.questions[i].ratings[j] };
        }
    }

    console.log(JSON.stringify(surveyObjPrisma, null, 4));

    const createdSurvey = await surveyService.createSurvey(surveyObjPrisma);

    res.status(201).json({ createdSurvey });
})

// GET --------------------------------------------------------------------

exports.getNotStartSurvey = catchError(async (req, res, next) => {

    const notStartSurvey = await surveyService.findNotStartSurvey();

    res.status(201).json({ notStartSurvey });
})

exports.getOngoingSurvey = catchError(async (req, res, next) => {

    const ongoingSurvey = await surveyService.findOngoingSurvey();

    res.status(201).json({ ongoingSurvey });
})

exports.getFinishedSurvey = catchError(async (req, res, next) => {

    const finishedSurvey = await surveyService.findFinishedSurvey();

    res.status(201).json({ finishedSurvey });
})
