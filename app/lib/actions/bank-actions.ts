'use server'
import { BankAccountSchema } from "@/app/types/form-shema";
import prisma from "../prisma";
import { getUser } from "./user-actions";
import { Bank } from "@/app/types/types";
import { AccountType } from "@prisma/client";


export async function getBankAccounts(id: string): Promise<any | undefined> {
    try {
        const bankAccount = await prisma.bankAccount.findMany({
            where: { userId: id }
        })
        if (!bankAccount) return undefined;

        return bankAccount;
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


function convertToAccountType(status: string): AccountType {
    Object.values(AccountType).includes(status as AccountType)
    return status as AccountType;

}