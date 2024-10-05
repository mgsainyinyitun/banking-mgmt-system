import { getBankAccounts } from '@/app/lib/actions/bank-actions';
import { getAllTransactions } from '@/app/lib/actions/transaction-actions';
import { Bank } from '@/app/types/types';
import TransactionTable from '@/app/ui/transaction/TransactionTable'
import { auth } from '@/auth';

const Transaction = async () => {
    const session = await auth();
    const banks: Bank[] = await getBankAccounts(session?.user?.id) as Bank[];
    const res = await getAllTransactions(banks[0].id, undefined, 10, 1, 10);

    return (
        <div className='w-full h-full p-3'>
            <div className='bg-content1-900 rounded-2xl w-full h-full'>
                <TransactionTable transactions={res?.transactions} total={res?.total} id={banks[0].id} />
            </div>
        </div>
    )
}

export default Transaction