'use server'
import { BankAccountSchema } from "@/app/types/form-shema";
import prisma from "../prisma";
import { Bank } from "@/app/types/types";
import { ACCOUNT_TYPE, BankAccountType } from "@prisma/client";
import { updateOrCreateMonthlyBalance } from "./monthly-balance-action";

export async function getBankAccounts(id: string | undefined): Promise<Bank[] | undefined> {
    try {
        const bankAccounts = await prisma.bankAccount.findMany({
            where: { userId: id }
        });
        if (!bankAccounts) return undefined;

        return bankAccounts.map(bankAccount => ({
            id: bankAccount.id,
            account_name: bankAccount.account_name,
            accountNumber: bankAccount.accountNumber,
            accountType: bankAccount.accountType,
            accountStatus: bankAccount.accountStatus,
            balance: bankAccount.balance,
            availableBalance: bankAccount.availableBalance,
            createdAt: bankAccount.createdAt,
            updatedAt: bankAccount.updatedAt,
            userId: bankAccount.userId,
            accountOpenedAt: bankAccount.accountOpenedAt,
            accountClosedAt: bankAccount.accountClosedAt,
        })) as Bank[];  // Cast to custom Bank[] type
    } catch (error) {
        console.log(error);
    }
}


export async function createBankAccount(formData: BankAccountSchema) {
    try {
        await prisma.bankAccount.create({
            data: {
                account_name: formData.username,
                accountType: convertToAccountType(formData.accountType) as BankAccountType,
                accountNumber: generateAccountNumber(),
                userId: formData.userId,
                balance: 0,
                availableBalance: 0,
            }
        });
        return { success: true };

    } catch (error) {
        console.log(error);
        return { success: false };
    }
}


export async function increaseBalance(id: number, amount: number) {
    try {
        await prisma.bankAccount.update({
            where: {
                id: id,
            },
            data: {
                balance: {
                    increment: amount,
                },
            },
        });
        await updateOrCreateMonthlyBalance(id, amount, true);
        return { success: true };
    } catch (error) {
        throw error;
    }
}

export async function increaseActualBallance(id: number, amount: number) {
    try {
        await prisma.bankAccount.update({
            where: {
                id: id,
            },
            data: {
                availableBalance: {
                    increment: amount,
                },
            },
        });
        // await updateOrCreateMonthlyBalance(id, amount, true);
        return { success: true };
    } catch (error) {
        throw error;
    }
}

export async function decreaseBalance(id: number, amount: number) {
    try {
        await prisma.bankAccount.update({
            where: {
                id: id,
            },
            data: {
                balance: {
                    decrement: amount,
                },
            },
        });
        await updateOrCreateMonthlyBalance(id, amount, false);
        return { success: true };
    } catch (error) {
        throw error;
    }
}


export async function getToAccountInfo(bankAccountNumber: string) {
    try {
        const account = await prisma.bankAccount.findUnique({
            where: {
                accountNumber: bankAccountNumber,
            },
        });

        if (!account) throw new Error('Transfer Account not found');

        const toAccount = {
            id: account?.id,
            account_name: account?.account_name,
            accountNumber: account?.accountNumber,
            accountType: account?.accountType,
            accountStatus: account?.accountStatus,
        };

        return { success: true, toAccount };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}



function generateAccountNumber(): string {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
}

function convertToAccountType(status: string): ACCOUNT_TYPE {
    Object.values(ACCOUNT_TYPE).includes(status as ACCOUNT_TYPE)
    return status as ACCOUNT_TYPE;

}
