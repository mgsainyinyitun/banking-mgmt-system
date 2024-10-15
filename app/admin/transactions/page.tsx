import React from 'react';
import { getTransactionByAdmin } from '@/app/lib/actions/transaction-actions';
import TransactionTable from '@/app/ui/transaction/TransactionTable';

const Transactions = async () => {
    const res = await getTransactionByAdmin(undefined, 10, 1, 10);
    if (!res.success) return;
    const transactions = res.transactions;
    const total = res.total;

    return (
        <div className='w-full h-full p-3'>
            <div className='bg-content1-900 rounded-2xl w-full h-full overflow-auto'>
                <TransactionTable transactions={transactions} total={total} id={-1} />
            </div>
        </div>

    );
}

export default Transactions;