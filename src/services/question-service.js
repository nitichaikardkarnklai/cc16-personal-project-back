const prisma = require("../models/prisma");

exports.deleteQuestionBySurveyId = (surveyId) => {

    return prisma.question.deleteMany({
        where: {
            surveyId
        }
    })
}

// exports.createQuestion = question => {
//     return prisma.question.create({
//         data: question,
//         include: {
//             ratings: true
//         }
//     })
// }