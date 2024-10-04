import { getBankAccounts } from '@/app/lib/actions/bank-actions';
import DepositForm from './DepositForm';
import { auth } from '@/auth';
import { Bank } from '@/app/types/types';

const Deposite = async () => {

    const session = await auth();
    const banks: Bank[] = await getBankAccounts(session?.user?.id) as Bank[];

    return (
        <div className='w-full h-full'>
            <DepositForm bank={banks[0]} />
        </div>
    )
}

export default Deposite