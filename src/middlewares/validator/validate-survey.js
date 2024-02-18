const Joi = require("joi");
const createError = require("../../utils/create-error");

const surveySchema = Joi.object({
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

exports.validateSurvey = (req, res, next) => {
    const { value, error } = surveySchema.validate(req.body);
    const currentTime = new Date();
    if (error) {
        throw error
    }
    if (value.startDate > value.endDate) {
        createError("start date cannot more than end date", 400);
    }
    if (value.startDate < currentTime || value.endDate < currentTime) {
        createError("you don't have time machine", 400);
    }
    req.body = value;
    next();
};