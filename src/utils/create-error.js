const createError = (message, statusCode) => {
    console.log("errMsg", message);
    const err = new Error(message);
    // console.log(err);
    err.statusCode = 400;
    throw err;
}

module.exports = createError;