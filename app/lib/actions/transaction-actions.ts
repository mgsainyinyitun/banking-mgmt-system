'use server'
import { DepositSchema } from "@/app/types/form-shema";
import prisma from "../prisma";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { Transaction, TransactionFilter } from "@/app/types/types";

export async function getAllTransactions(
    id: number | undefined, filter: TransactionFilter = {}, count?: number, page?: number, pageSize?: number) {
    if (!id) return;
    try {
        let skip = undefined;
        if (page && pageSize) {
            skip = (page - 1) * pageSize; // 1, 10,
        }

        const [transactions, total] = await prisma.$transaction([
            prisma.transaction.findMany({
                where: { ...filter },
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: count || undefined
            }),
            prisma.transaction.count({
                where: { ...filter }
            })
        ]);
        const trans = transactions as Transaction[];
        return { success: true, transactions: trans, total };

    } catch (error) {
        console.log(error);
        return { success: false };
    }
}


export async function deposit(formData: DepositSchema) {
    try {
        console.log(formData);

        const transaction = await prisma.transaction.create({
            data: {
                amount: formData.amount,
                transactionType: TransactionType.DEPOSIT,
                bankAccountId: formData.id,
                transactionStatus: TransactionStatus.PENDING,
            }
        }) as Transaction

        console.log('trans::::', transaction);

        return { success: true, transaction };

    } catch (error) {
        console.log(error);
        return { success: false };
    }
}