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

exports.findSurveyById = id => prisma.survey.findFirst({
    where: {
        id
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

exports.deleteSurvey = (id) => {

    return prisma.survey.delete({
        where: {
            id
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

exports.updateSurvey = (survey, id) => {
    // const { title, description, startDate, endDate, image, question } = survey
    return prisma.survey.update({
        where: {
            id
        },
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

exports.findNotSubmitSurveyForUser = (userId) => {
    console.log(userId);
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
            },
            NOT: {
                questions: {
                    some: {
                        userSurveys: {
                            some: {
                                userId
                            }
                        }
                    }
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

exports.findSubmitSurveyForUser = (userId) => {
    console.log(userId);

    return prisma.survey.findMany({
        where: {
            questions: {
                some: {
                    userSurveys: {
                        some: {
                            userId
                        }
                    }
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