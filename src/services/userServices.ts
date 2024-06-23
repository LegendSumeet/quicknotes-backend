import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (email: string, name: string) => {

    const user = await prisma.user.create({
        data: {
            email,
            name,
        },
    });

    return user;
};

export const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    return user;
};
