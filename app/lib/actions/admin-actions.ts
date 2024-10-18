'use server'
import { MonthlyData, User, UserDetail, UserList } from "@/app/types/types";
import prisma from "../prisma";
import { ACCOUNT_TYPE, Prisma } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { AddAccountSchema, ProfileSchema, AdminUserUpdateSchema } from "@/app/types/form-shema";
import { revalidatePath } from 'next/cache';


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


export const getAllUsers = async (filter: Prisma.UserWhereInput = {}, count?: number, page?: number, pageSize?: number) => {
    try {
        let skip = undefined;
        if (page && pageSize) {
            skip = (page - 1) * pageSize;
        }

        const [users, total] = await prisma.$transaction([
            prisma.user.findMany({
                where: filter,
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: count || undefined,
                select: {
                    id: true,
                    type: true,
                    profileImage: true,
                    username: true,
                    email: true,
                    phone: true,
                    bankAccounts: {
                        select: {
                            accountNumber: true,
                            account_name: true,
                            accountType: true,
                            balance: true,
                            availableBalance: true,
                            accountStatus: true,
                            accountOpenedAt: true,
                            accountClosedAt: true,
                        }
                    }
                }
            }),
            prisma.user.count({
                where: filter
            })
        ]);
        const userList: UserList[] = users.map(user => ({
            id: user.id,
            type: user.type,
            profileImage: user.profileImage,
            username: user.username,
            email: user.email,
            phone: user.phone,
            bankAccounts: user.bankAccounts
        }));

        return { success: true, users: userList, total };
    } catch (error) {
        console.error(error);
        return { success: false, users: [], total: 0 };
    }
};


export const getUserDetail = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                type: true,
                profileImage: true,
                username: true,
                email: true,
                phone: true,
                city: true,
                state: true,
                address: true,
                nrc: true,
                dob: true,
                createdAt: true,
                updatedAt: true,
                bankAccounts: {
                    select: {
                        accountNumber: true,
                        account_name: true,
                        accountType: true,
                        balance: true,
                        availableBalance: true,
                        accountStatus: true,
                        accountOpenedAt: true,
                        accountClosedAt: true,
                    }
                },
                _count: {
                    select: {
                        Ticket: true,
                        bankAccounts: true,
                    }
                }
            }
        });
        return { success: true, user: user as UserDetail };
    } catch (error) {
        console.error(error);
        return { success: false, user: null };
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


export const getUserGrowthData = async () => {
    const users = await prisma.user.findMany({
        select: {
            createdAt: true,
            type: true,
        },
    });

    const monthlyData = users.reduce<Record<string, MonthlyData>>((acc, user) => {
        const month = user.createdAt.toLocaleString('default', { month: 'short' });
        const year = user.createdAt.getFullYear();
        const key = `${month}-${year}`;

        if (!acc[key]) {
            acc[key] = { month: key, users: 0, customers: 0, admins: 0, tellers: 0 };
        }

        acc[key].users += 1;
        if (user.type === ACCOUNT_TYPE.CUSTOMER) {
            acc[key].customers += 1;
        } else if (user.type === ACCOUNT_TYPE.ADMIN) {
            acc[key].admins += 1;
        } else if (user.type === ACCOUNT_TYPE.TELLER) {
            acc[key].tellers += 1;
        }

        return acc;
    }, {});

    const sortedData = Object.values(monthlyData).sort((a, b) => {
        const [aMonth, aYear] = a.month.split('-');
        const [bMonth, bYear] = b.month.split('-');
        const aDate = new Date(`${aMonth} 1, ${aYear}`);
        const bDate = new Date(`${bMonth} 1, ${bYear}`);
        return aDate.getTime() - bDate.getTime();
    });

    return sortedData;
};

export const updateUserAdmin = async (data: AdminUserUpdateSchema) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: data.id },
            data: {
                username: data.username,
                nrc: data.nrc,
                email: data.email,
                phone: data.phone,
                city: data.city,
                state: data.state,
                address: data.address,
                type: data.type,
            },
        });

        const bankAccount = await prisma.bankAccount.findFirst({
            where: { userId: data.id },
        });

        if (bankAccount && data.status) {
            await prisma.bankAccount.update({
                where: { id: bankAccount.id },
                data: {
                    accountStatus: data.status,
                },
            });
        }

        revalidatePath('/admin');

        return { success: true, user: updatedUser };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to update user.' };
    }
};
