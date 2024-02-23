const Joi = require("joi");
const createError = require("../../utils/create-error");

const createSurveySchema = Joi.object({
    title: Joi.string().required().trim().messages({
        'string.empty': "survey title is required",
        "any.required": "survey title is required",
    }),
    description: Joi.string().trim(),
    startDate: Joi.date().required().messages({
        'string.empty': "startDate is required",
        "any.required": "startDate is required",
    }),
    endDate: Joi.date().required().messages({
        'string.empty': "endDate is required",
        "any.required": "endDate is required",
    }),
    image: Joi.optional().allow(''),
    isLive: Joi.boolean(),
    questions: Joi.array().items(
        Joi.object({
            title: Joi.string().required().trim().messages({
                'string.empty': "question title is required",
                "any.required": "question title is required",
            }),
            description: Joi.string().trim(),
            ratings: Joi.array().items(
                Joi.object({
                    name: Joi.string().required().messages({
                        'string.empty': "rating name is required",
                        "any.required": "rating name is required",
                    }),
                    score: Joi.number().integer().required().messages({
                        'string.empty': "rating score is required",
                        "any.required": "rating score is required",
                    })
                })
            )
        })
    )
});

const editSurveySchema = Joi.object({
    title: Joi.string().trim().required().messages({
        'string.empty': "survey title is required",
        "any.required": "survey title is required",
    }),
    description: Joi.string().trim().allow(''),
    startDate: Joi.date().required().messages({
        'string.empty': "startDate is required",
        "any.required": "startDate is required",
    }),
    endDate: Joi.date().required().messages({
        'string.empty': "endDate is required",
        "any.required": "endDate is required",
    }),
    image: Joi.optional().allow(''),
    isLive: Joi.boolean(),
    questions: Joi.array().items(
        Joi.object({
            title: Joi.string().trim().required().messages({
                'string.empty': "question title is required",
                "any.required": "question title is required",
            }),
            description: Joi.string().trim(),
            ratings: Joi.array().items(
                Joi.object({
                    name: Joi.string().required().messages({
                        'string.empty': "rating name is required",
                        "any.required": "rating name is required",
                    }),
                    score: Joi.number().required().integer().messages({
                        'string.empty': "rating score is required",
                        "any.required": "rating score is required",
                    })
                })
            )
        })
    )
});

exports.validateCreateSurvey = (req, res, next) => {
    const { value, error } = createSurveySchema.validate(req.body);
    const currentTime = new Date();
    console.log(currentTime, value.startDate);

    currentTime.setHours(0, 0, 0, 0);
    if (error) {
        // console.log(error);
        throw error
    }
    if (value.startDate > value.endDate) {
        createError("start date cannot more than end date", 400);
    }
    if (value.startDate < currentTime || value.endDate < currentTime) {
        // console.log(currentTime, value.startDate)
        createError("you don't have time machine", 400);
    }
    const endDateTemp = value.endDate;
    endDateTemp.setHours(30, 59, 59, 999);
    // endDateTemp.setHours(23, 59, 59, 999);
    value.endDate = endDateTemp;
    req.body = value;
    next();
};

exports.validateEditSurvey = (req, res, next) => {
    const { value, error } = editSurveySchema.validate(req.body);
    // console.log("request body", req.body);
    const currentTime = new Date();
    console.log(currentTime, value.startDate);

    currentTime.setHours(0, 0, 0, 0);
    if (error) {
        throw error
    }
    if (value.startDate > value.endDate) {
        createError("start date cannot more than end date", 400);
    }
    if (value.startDate < currentTime || value.endDate < currentTime) {
        createError("you don't have time machine", 400);
    }
    const endDateTemp = value.endDate;
    endDateTemp.setHours(30, 59, 59, 999);
    value.endDate = endDateTemp;
    req.body = value;
    next();
};