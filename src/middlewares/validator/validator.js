const validate = schema => (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    console.log(value);
    if (error) {
        throw error;
    }
    req.body = value;
    next();
};

module.exports = validate;