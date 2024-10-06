import { getBankAccounts } from '@/app/lib/actions/bank-actions';
import { auth } from '@/auth';
import { Bank } from '@/app/types/types';
import TransferForm from './TransferForm';

const Transfer = async () => {

    const session = await auth();
    const banks: Bank[] = await getBankAccounts(session?.user?.id) as Bank[];

    return (
        <div className='w-full h-full'>
            <TransferForm bank={banks[0]} />
        </div>
    )
}

export default Transfer