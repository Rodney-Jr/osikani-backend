
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getOrCreateUser = async (phoneNumber: string, name?: string) => {
    try {
        let user = await prisma.user.findUnique({
            where: { phoneNumber },
            include: { profile: true }
        });

        if (!user) {
            console.log(`Creating new user for ${phoneNumber}`);
            user = await prisma.user.create({
                data: {
                    phoneNumber,
                    name: name || "Friend",
                    profile: {
                        create: {
                            currency: "GHS"
                        }
                    }
                },
                include: { profile: true }
            });
        }
        return user;
    } catch (error) {
        console.error("Error in getOrCreateUser:", error);
        throw error;
    }
};

export const getUserProfile = async (phoneNumber: string) => {
    return await prisma.user.findUnique({
        where: { phoneNumber },
        include: {
            profile: true,
            transactions: { take: 5, orderBy: { date: 'desc' } }, // Context for AI
            goals: true
        }
    });
};
