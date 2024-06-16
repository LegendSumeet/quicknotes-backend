import { PrismaClient } from "@prisma/client";
import { validateUser } from "../utils/validitor";
const prisma = new PrismaClient();
export const createUser = async (email, name) => {
    validateUser(email);
    const user = await prisma.user.create({
        data: {
            email,
            name,
        },
    });
    return user;
};
export const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    return user;
};
