const catchError = require("../utils/catch-error");
const surveyService = require("../services/survey-service");
const questionService = require("../services/question-service");
const createError = require("../utils/create-error");

exports.createSurveyForm = catchError(async (req, res, next) => {
    const surveyObj = req.body;

    const existSurveyByTitle = await surveyService.findSurveyByTitle(surveyObj.title);
    if (existSurveyByTitle) {
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

// DELETE SURVEY --------------------------------------------------------
exports.removeSurvey = catchError(async (req, res, next) => {

    const deletedSurvey = await surveyService.deleteSurvey(+req.params.surveyId);

    res.status(201).json({ deletedSurvey });
})

// EDIT SURVEY --------------------------------------------------------
exports.editSurveyForm = catchError(async (req, res, next) => {
    const surveyObj = req.body;
    const id = +req.params.surveyId;

    const existSurveyById = await surveyService.findSurveyById(id);
    if (!existSurveyById) {
        createError("edited survey id is not found", 400);
    } else {
        const existSurveyByTitle = await surveyService.findSurveyByTitle(surveyObj.title);
        if (existSurveyByTitle && existSurveyByTitle.id !== id) {
            createError("survey title is existence", 400);
        }
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

    await questionService.deleteQuestionBySurveyId(id); // id is survey_id
    const updatedSurvey = await surveyService.updateSurvey(surveyObjPrisma, id);

    res.status(201).json({ updatedSurvey });
})

// GET START SURVEY FOR A USER --------------------------------------------------------------------

exports.getNotFinishedSurveyForUser = catchError(async (req, res, next) => {

    const notSubmitSurvey = await surveyService.findNotSubmitSurveyForUser(+req.params.userId);

    res.status(201).json({ notSubmitSurvey });
})

// GET DONE SURVEY FOR A USER --------------------------------------------------------------------

exports.getDoneSurveyForUser = catchError(async (req, res, next) => {

    const doneSurvey = await surveyService.findSubmitSurveyForUser(+req.params.userId);

    res.status(201).json({ doneSurvey });
})