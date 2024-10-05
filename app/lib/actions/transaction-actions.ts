'use server'
import { DepositSchema, WithdrawSchema } from "@/app/types/form-shema";
import prisma from "../prisma";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { Transaction, TransactionFilter } from "@/app/types/types";
import { decreaseBalance, increaseBalance } from "./bank-actions";

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
        const transaction = await prisma.transaction.create({
            data: {
                amount: formData.amount,
                transactionType: TransactionType.DEPOSIT,
                bankAccountId: formData.id,
                transactionStatus: TransactionStatus.PENDING,
            }
        }) as Transaction

        await increaseBalance(formData.id, formData.amount);

        return { success: true, transaction };

    } catch (error) {
        console.log(error);
        return { success: false };
    }
}

export async function withdraw(formData: WithdrawSchema) {
    try {
        const transaction = await prisma.transaction.create({
            data: {
                amount: formData.amount,
                transactionType: TransactionType.WITHDRAWAL,
                bankAccountId: formData.id,
                transactionStatus: TransactionStatus.PENDING,
            }
        }) as Transaction

        await decreaseBalance(formData.id, formData.amount);

        return { success: true, transaction };

    } catch (error) {
        console.log(error);
        return { success: false };
    }
}