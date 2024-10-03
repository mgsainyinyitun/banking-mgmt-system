'use server'
import { BankAccountSchema } from "@/app/types/form-shema";
import prisma from "../prisma";
import { Bank } from "@/app/types/types";
import { ACCOUNT_TYPE } from "@prisma/client";

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


export async function createBankAccount(formData: BankAccountSchema): Promise<Bank | undefined> {
    console.log('user id:', formData.userId);
    try {
        console.log('user id:', formData.userId);

        const bankAccountData: any = {
            account_name: formData.username,
            accountType: convertToAccountType(formData.accountType),  // Convert the account type string to enum
            accountNumber: generateAccountNumber(),  // Generate a unique account number
            userId: formData.userId,  // userId is now guaranteed to be a string
            balance: 0,  // Initial balance
            availableBalance: 0,  // Initial available balance
        };

        console.log('create :with : ', bankAccountData);
        const dbBank = await prisma.bankAccount.create({
            data: bankAccountData
        });

        console.log('created:', dbBank);
        
        return;

    } catch (error) {
        console.log(error);
    }
}

function generateAccountNumber(): string {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
}

function convertToAccountType(status: string): ACCOUNT_TYPE {
    Object.values(ACCOUNT_TYPE).includes(status as ACCOUNT_TYPE)
    return status as ACCOUNT_TYPE;

}
