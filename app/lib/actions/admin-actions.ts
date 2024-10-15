import { User } from "@/app/types/types";
import prisma from "../prisma";
import { ACCOUNT_TYPE, Prisma } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { AddAccountSchema, ProfileSchema } from "@/app/types/form-shema";


export const getUserCounts = async () => {
    const [adminCount, customerCount, tellerCount, total] = await prisma.$transaction([
        prisma.user.count({ where: { type: ACCOUNT_TYPE.ADMIN } }),
        prisma.user.count({ where: { type: ACCOUNT_TYPE.CUSTOMER } }),
        prisma.user.count({ where: { type: ACCOUNT_TYPE.TELLER } }),
        prisma.user.count()
    ]);

    return { adminCount, customerCount, tellerCount, total };
};


export const getRecentCustomers = async () => {
    try {
        const customers = await prisma.user.findMany({
            where: { type: ACCOUNT_TYPE.CUSTOMER },
            orderBy: { createdAt: 'desc' },
            take: 10
        });
        return { success: true, customers };
    } catch (error) {
        console.error(error);
        return { success: false, customers: [] };
    }
};


export const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return { success: true, users: users as User[] };
    } catch (error) {
        console.error(error);
        return { success: false, users: [] };
    }
};

export const deleteUser = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        await prisma.user.delete({ where: { id } });
        return { success: true, message: 'User deleted successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'An error occurred while deleting the user' };
    }
};

export const addUser = async (userData: AddAccountSchema) => {
    try {
        const hashedPassword = await bcrypt.hash('12345', 10);
        const type = userData.type ? userData.type : undefined;
        const user = await prisma.user.create({
            data: {
                username: userData.username,
                email: userData.email,
                password: hashedPassword,
                nrc: userData.nrc,
                dob: userData.dob.toISOString(),
                phone: userData.phone,
                city: userData.city,
                state: userData.state,
                address: userData.address,
                type: type as ACCOUNT_TYPE,
            }
        });
        console.log('created user:', user);
        return { success: true, user };
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { errors: { success: false, message: 'A user already exists. Please try with unique nrc and email.' } };
            }
        }
        return {
            message: { errors: { success: false, message: 'something went wrong! Please try again.' } }
        };
    }
};

export const updateUser = async (id: string, userData: ProfileSchema) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                username: userData.username,
                email: userData.email,
                nrc: userData.nrc,
                dob: userData.dob.toISOString(),
                phone: userData.phone,
                city: userData.city,
                state: userData.state,
                address: userData.address,
            }
        });

        console.log('updated user:', updatedUser);
        return { success: true, user: updatedUser };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'An error occurred while updating the user' };
    }
};
