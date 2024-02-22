const catchError = require("../utils/catch-error");
const userSurveyService = require("../services/user-survey-service");
const surveyService = require("../services/survey-service");
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

exports.getUserSurveyAVG = catchError(async (req, res, next) => {

    // const avgData = await userSurveyService.findAvgByQuestion();
    const avgData = await userSurveyService.findScore();
    const countUserDoSurvey = await userSurveyService.countUserDoSurvey();

    const tempFinishedSurvey = await surveyService.findFinishedSurvey();

    let finishedSurvey = [...tempFinishedSurvey];
    for (let i = 0; i < finishedSurvey.length; i++) {
        for (let l = 0; l < countUserDoSurvey.length; l++) {
            if (countUserDoSurvey[l].count_user_do_survey !== null && finishedSurvey[i].id === countUserDoSurvey[l].survey_id) {
                finishedSurvey[i].countDoSurvey = parseInt(countUserDoSurvey[l].count_user_do_survey);
                finishedSurvey[i].countTotalUser = +countUserDoSurvey[l].count_total_user;
            }
        }
        for (let j = 0; j < finishedSurvey[i].questions.length; j++) {
            for (let k = 0; k < avgData.length; k++) {
                if (finishedSurvey[i].questions[j].id === avgData[k].question_id) {
                    // console.log(avgData[k].avg_by_question, avgData[k].full_score_per_question)
                    finishedSurvey[i].questions[j].avg = +avgData[k].avg_by_question;
                    finishedSurvey[i].questions[j].fullScore = avgData[k].full_score_per_question;
                }
            }
        }
    }
    // console.log(finishedSurvey);
    // console.log(JSON.stringify(countUserDoSurvey, null, 4));

    // res.status(201).json({ countUserDoSurvey });
    res.status(201).json({ finishedSurvey });
})

exports.getCountUserSurvey = catchError(async (req, res, next) => {

    const countUserDoSurvey = await userSurveyService.countUserDoSurvey();

    const tempOngoingSurvey = await surveyService.findOngoingSurvey();

    let ongoingSurvey = [...tempOngoingSurvey];
    for (let i = 0; i < ongoingSurvey.length; i++) {
        for (let l = 0; l < countUserDoSurvey.length; l++) {
            if (countUserDoSurvey[l].count_user_do_survey !== null && ongoingSurvey[i].id === countUserDoSurvey[l].survey_id) {
                ongoingSurvey[i].countDoSurvey = parseInt(countUserDoSurvey[l].count_user_do_survey);
                ongoingSurvey[i].countTotalUser = +countUserDoSurvey[l].count_total_user;
            }
        }
    }

    res.status(201).json({ ongoingSurvey });
})