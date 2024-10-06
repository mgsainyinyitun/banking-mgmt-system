import { Transaction } from "@/app/types/types";

export function convertToDisplayData(transactions: Transaction[] | undefined
) {
    if (!transactions) return [];
    const trans = transactions?.map(tr => {
        return {
            id: tr.id,
            transaction_id: tr.transaction_id,
            amount: tr.amount,
            transactionType: tr.transactionType,
            transferAccountId: tr.transferAccountId ? tr.transferAccountId : null,
            transferAccountProfile: tr.transferAccountProfile ? tr.transferAccountProfile : null,
            transferType: tr.transferType ? tr.transferType : null,
            date: tr.date?.toDateString(),
            transactionStatus: tr.transactionStatus?.toString(),
            description: tr.description ? tr.description : '',
        } as Transaction
    });
    return trans;
}