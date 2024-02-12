const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
}

module.exports = createError;