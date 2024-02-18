const prisma = require("../models/prisma");

exports.createSurvey = survey => {
    // const { title, description, startDate, endDate, image, question } = survey
    return prisma.survey.create({
        data: survey,
        include: {
            questions: {
                include: {
                    ratings: true
                }
            }
        }
    })
}

exports.findSurveyByTitle = title => prisma.survey.findFirst({
    where: {
        title
    }
})

exports.findNotStartSurvey = () => {

    const currentTime = new Date();

    return prisma.survey.findMany({
        where: {
            startDate: {
                gt: currentTime
            }
        },
        include: {
            questions: {
                include: {
                    ratings: true
                }
            }
        }
    })
}

exports.findOngoingSurvey = () => {

    const currentTime = new Date();

    return prisma.survey.findMany({
        where: {
            AND: {
                startDate: {
                    lte: currentTime
                },
                endDate: {
                    gte: currentTime
                }
            }
        },
        include: {
            questions: {
                include: {
                    ratings: true
                }
            }
        }
    })
}

exports.findFinishedSurvey = () => {

    const currentTime = new Date();

    return prisma.survey.findMany({
        where: {
            endDate: {
                lt: currentTime
            }
        },
        include: {
            questions: {
                include: {
                    ratings: true
                }
            }
        }
    })
}