const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const catchError = require("../utils/catch-error");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

exports.register = catchError(async (req, res, next) => {
    // console.log("body", req.body);
    const existUser = await userService.findUserByEmail(req.body.email);
    console.log("log result:", existUser, "finding email", req.body.email);
    if (existUser) {
        createError("EMAIL_IN_USE", 400);
    }
    req.body.password = await hashService.hash(req.body.password);

    const newUser = await userService.createUser(req.body);
    const payload = { userId: newUser.id };
    const token = jwtService.sign(payload);
    delete newUser.password

    res.status(201).json({ token, newUser });
})

exports.login = catchError(async (req, res, next) => {
    const existsUser = await userService.findUserByEmail(
        req.body.email
    );

    if (!existsUser) {
        createError("invalid credentials", 400);
    }
    const isMatch = await hashService.compare(
        req.body.password,
        existsUser.password
    );
    if (!isMatch) {
        createError("invalid credentials", 400);
    }
    const payload = { userId: existsUser.id };
    const token = jwtService.sign(payload);
    delete existsUser.password;

    res.status(200).json({ token, user: existsUser });
})

exports.getMe = ((req, res, next) => {
    res.status(200).json({ user: req.user });
});
