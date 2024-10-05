import { getBankAccounts } from '@/app/lib/actions/bank-actions';
import { auth } from '@/auth';
import { Bank } from '@/app/types/types';
import WithdrawalForm from './WithdrawalForm';


const Deposite = async () => {

    const session = await auth();
    const banks: Bank[] = await getBankAccounts(session?.user?.id) as Bank[];

    return (
        <div className='w-full h-full'>
            <WithdrawalForm bank={banks[0]} />
        </div>
    )
}

export default Deposite