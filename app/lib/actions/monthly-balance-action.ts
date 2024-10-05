'use server'

import prisma from "../prisma";


export async function getMonthlyBalances(bankAccountId: number) {
    const monthlyBalances = await prisma.monthlyBalanceRecord.findMany({
        where: { bankAccountId },
        orderBy: {
            month: 'asc'
        },
    });
    console.log('monthlyBalances', monthlyBalances);
    return monthlyBalances;
}



export async function updateOrCreateMonthlyBalance(bankAccountId: number, amount: number, isDeposit: boolean) {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // Months are 0-indexed
    const year = currentDate.getFullYear();

    const adjustment = isDeposit ? amount : -amount;

    // Check if a record exists for this month and year
    const existingBalance = await prisma.monthlyBalanceRecord.findUnique({
        where: {
            month_year_bankAccountId: {
                month,
                year,
                bankAccountId,
            },
        },
    });

    if (existingBalance) {
        // Update existing record
        await prisma.monthlyBalanceRecord.update({
            where: { id: existingBalance.id },
            data: {
                balance: existingBalance.balance + adjustment,
            },
        });
    } else {
        // Create new record
        await prisma.monthlyBalanceRecord.create({
            data: {
                month,
                year,
                balance: adjustment,
                bankAccountId,
            },
        });
    }
}
