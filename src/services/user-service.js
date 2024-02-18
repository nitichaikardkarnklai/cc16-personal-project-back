const prisma = require("../models/prisma");

exports.findUserByEmail = email => {
    return prisma.user.findFirst({
        where: {
            email
        }
    });
};

exports.createUser = data => prisma.user.create({ data });

exports.findUserById = id => prisma.user.findUnique({ where: { id } });

exports.findAllUser = () => prisma.user.findMany();

exports.updateUserById = (data, id) => prisma.user.update({ data, where: { id } });