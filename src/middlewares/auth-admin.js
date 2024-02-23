const createError = require("../utils/create-error");
const catchError = require("../utils/catch-error");


const authAdmin = catchError(async (req, res, next) => {
    if (!req.user.isAdmin) {
        createError("unauthenticated cause not admin", 403);
    }
    next();
});

module.exports = authAdmin;