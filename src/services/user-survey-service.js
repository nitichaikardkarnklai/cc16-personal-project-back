const prisma = require("../models/prisma");

exports.createUserSurvey = (userSurveys) => {
    return prisma.userSurvey.createMany({
        data: userSurveys
    })
}

exports.findUserSurveyByUserId = (surveyId, userId) => {
    return prisma.userSurvey.findMany({
        where: {
            userId,
            question: {
                surveyId
            }
        }
    })
}