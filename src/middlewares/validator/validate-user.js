const Joi = require("joi");
const catchError = require("../../utils/catch-error");

const userIdSchema = Joi.object({
    userId: Joi.number().positive().required()
});

const editUserSchema = Joi.object({
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    email: Joi.string().email({ tlds: false }),
    isAdmin: Joi.boolean()
}).or("firstName", "lastName", "email", "isAdmin");

exports.validateUserId = (req, res, next) => {
    const { value, error } = userIdSchema.validate(req.params);
    // console.log("error", error)
    // console.log("value", value)
    if (error) {
        throw error
    }
    req.userId = value.userId;
    next();
};

exports.validateUserBodyForEdit = (req, res, next) => {
    const { value, error } = editUserSchema.validate(req.body);
    if (error) {
        throw error
    }
    req.bodyObj = value;
    next();
};