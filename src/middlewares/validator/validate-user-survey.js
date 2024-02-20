const Joi = require("joi");
const createError = require("../../utils/create-error");

const createUserSurveySchema = Joi.object({
    userSurveys: Joi.array().items(
        Joi.object({
            questionId: Joi.number().integer().required().messages({
                'string.empty': "questionId is required",
                "any.required": "questionId is required",
            }),
            score: Joi.number().integer().required().messages({
                'string.empty': "rating score is required",
                "any.required": "rating score is required",
            })
        })
    )
});

exports.validateUserSurvey = (req, res, next) => {
    const { value, error } = createUserSurveySchema.validate(req.body);

    if (error) {
        throw error
    }

    req.body = value;
    next();
};