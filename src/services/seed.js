const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const hashPassword = bcrypt.hashSync("123456", 10);

const userData = [
    { firstName: "dummy01", lastName: "dummy01", password: hashPassword, email: "dummy01.dm@cc.mail" },
    { firstName: "dummy02", lastName: "dummy02", password: hashPassword, email: "dummy02.dm@cc.mail" },
    { firstName: "dummy03", lastName: "dummy03", password: hashPassword, email: "dummy03.dm@cc.mail" },
    { firstName: "dummy04", lastName: "dummy04", password: hashPassword, email: "dummy04.dm@cc.mail" },
    { firstName: "dummy05", lastName: "dummy05", password: hashPassword, email: "dummy05.dm@cc.mail" },
    { firstName: "dummy06", lastName: "dummy06", password: hashPassword, email: "dummy06.dm@cc.mail" },
    { firstName: "dummy07", lastName: "dummy07", password: hashPassword, email: "dummy07.dm@cc.mail" },
    { firstName: "dummy08", lastName: "dummy08", password: hashPassword, email: "dummy08.dm@cc.mail" },
    { firstName: "dummy09", lastName: "dummy09", password: hashPassword, email: "dummy09.dm@cc.mail" },
    { firstName: "dummy10", lastName: "dummy10", password: hashPassword, email: "dummy10.dm@cc.mail" }
]

const run = async () => {
    await prisma.user.createMany({ data: userData });
}

run();