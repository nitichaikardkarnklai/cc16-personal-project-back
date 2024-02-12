const prisma = require("../models/prisma");

exports.findUserByEmail = email => {
    return prisma.user.findFirst({
        where: {
            email
        }
    });
};

exports.createUser = data => prisma.user.create({ data });