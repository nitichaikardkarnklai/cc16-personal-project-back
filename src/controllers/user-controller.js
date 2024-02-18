const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const userService = require("../services/user-service");

exports.checkExistUser = catchError(async (req, res, next) => {
    const existUser = await userService.findUserById(req.userId);
    // console.log("existUser!!!!!!!!!!!!!!!1", existUser);

    if (!existUser) {
        createError("user was not found naja", 400);
    }
    delete existUser.password;
    req.user = existUser;
    // console.log("existUser!!!!!!!!!!!!!!!2", req.user);
    next();
});

exports.getAllUser = catchError(async (req, res, next) => {
    const users = await userService.findAllUser();
    for (el of users) {
        delete el.password;
    }
    res.status(200).json({ users });
});

exports.editUser = catchError(async (req, res, next) => {
    // validate user body
    console.log(req.body);
    if (!req.body) {
        createError("no body data to edit", 400)
    }

    const updatedUser = await userService.updateUserById(req.body, req.user.id);
    delete updatedUser.password;
    console.log("updated response:", updatedUser);

    res.status(200).json(updatedUser);
});

exports.deletedUser = catchError(async (req, res, next) => {

    let updateDelete = null
    if (!req.user.deletedAt) {
        updateDelete = new Date()
    }

    const deletedUser = await userService.updateUserById({ deletedAt: updateDelete }, req.user.id);
    delete deletedUser.password;
    // console.log("deleted response:", deletedUser);

    res.status(200).json(deletedUser);
});