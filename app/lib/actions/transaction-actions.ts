'use server'
import { DepositSchema, TransferSchema, WithdrawSchema } from "@/app/types/form-shema";
import prisma from "../prisma";
import { InvoiceStatus, InvoiceType, TransactionStatus, TransactionType, TransferType } from "@prisma/client";
import { Transaction, TransactionFilter } from "@/app/types/types";
import { decreaseBalance, getToAccountInfo, increaseActualBallance, increaseBalance } from "./bank-actions";

export async function getAllTransactions(
    id: number | undefined, filter: TransactionFilter = {}, count?: number, page?: number, pageSize?: number) {
    if (!id) return;
    try {
        let skip = undefined;
        if (page && pageSize) {
            skip = (page - 1) * pageSize;
        }

        filter.bankAccountId = id;
        const [transactions, total] = await prisma.$transaction([
            prisma.transaction.findMany({
                where: filter,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    transferAccount: {
                        include: {
                            User: true,
                        }
                    }
                },
                skip,
                take: count || undefined
            }),
            prisma.transaction.count({
                where: filter
            })
        ]);
        const trans = transactions as Transaction[];

        transactions.forEach(tr => {
            const t = tr as Transaction;
            t.transferAccountProfile = tr.transferAccount?.User?.profileImage || undefined;
        })

        return { success: true, transactions: trans, total };

    } catch (error) {
        console.log(error);
        return { success: false };
    }
}


export async function getTransactionByAdmin(
    filter: TransactionFilter = {}, count?: number, page?: number, pageSize?: number
) {
    try {
        let skip = undefined;
        if (page && pageSize) {
            skip = (page - 1) * pageSize;
        }

        const [transactions, total] = await prisma.$transaction([
            prisma.transaction.findMany({
                where: filter,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    transferAccount: {
                        include: {
                            User: true,
                        }
                    }
                },
                skip,
                take: count || undefined
            }),
            prisma.transaction.count({
                where: filter
            })
        ]);

        const trans = transactions as Transaction[];

        transactions.forEach(tr => {
            const t = tr as Transaction;
            t.transferAccountProfile = tr.transferAccount?.User?.profileImage || undefined;
        })

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


export async function transfer(formData: TransferSchema) {

    try {

        const { success, toAccount } = await getToAccountInfo(formData.to_account_id);
        if (!success && !toAccount) return { success: false };

        const to_acc_id = toAccount?.id;
        if (!to_acc_id) return { success: false };

        const [tran_own, tran_recv] = await prisma.$transaction([
            prisma.transaction.create({
                data: {
                    amount: formData.amount,
                    transactionType: TransactionType.TRANSFER,
                    bankAccountId: formData.id,
                    transferAccountId: to_acc_id,
                    transactionStatus: TransactionStatus.PENDING,
                    transferType: TransferType.CASHOUT,
                }
            }),
            prisma.transaction.create({
                data: {
                    amount: formData.amount,
                    transactionType: TransactionType.TRANSFER,
                    bankAccountId: to_acc_id,
                    transferAccountId: formData.id,
                    transactionStatus: TransactionStatus.PENDING,
                    transferType: TransferType.CASHIN,
                }
            })
        ]);

        await decreaseBalance(formData.id, formData.amount);
        await increaseBalance(to_acc_id, formData.amount);
        await increaseActualBallance(to_acc_id, formData.amount);

        const [tran_own_success, tran_rec_success] = await prisma.$transaction([
            prisma.transaction.update({
                where: { id: tran_own.id },
                data: {
                    transactionStatus: TransactionStatus.SUCCESS
                }
            }),
            prisma.transaction.update({
                where: { id: tran_recv.id },
                data: {
                    transactionStatus: TransactionStatus.SUCCESS
                }
            }),
        ]);

        // Create invoices for both the sender and receiver
        const [senderInvoice, receiverInvoice] = await prisma.$transaction([
            prisma.invoice.create({
                data: {
                    bankId: tran_own_success.bankAccountId,
                    amount: formData.amount,
                    status: InvoiceStatus.PAID,
                    type: InvoiceType.TRANSFER,
                    transactionId: tran_own_success.id,
                },
            }),
            prisma.invoice.create({
                data: {
                    bankId: tran_rec_success.bankAccountId,
                    amount: formData.amount,
                    status: InvoiceStatus.PAID,
                    type: InvoiceType.RECEIVE,
                    transactionId: tran_rec_success.id,
                },
            }),
        ]);

        const rtrn = tran_own_success as Transaction;
        return {
            success: true,
            transaction: rtrn,
            rec_id: tran_rec_success.bankAccountId,
            senderInvoice: senderInvoice,
            receiverInvoice: receiverInvoice
        };

    } catch (error) {
        console.log(error);
        return { success: false };
    }
}