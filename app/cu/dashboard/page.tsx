import React from 'react'
import TotalBalance from '../../ui/dashboard/TotalBalance';
import MoneyFlow from '../../ui/dashboard/MoneyFlow';
import RecentTransactions from '../../ui/dashboard/RecentTransactions';
import { auth } from '@/auth';
import { getBankAccounts } from '@/app/lib/actions/bank-actions';
import { Bank } from '@/app/types/types';
import { getAllTransactions } from '@/app/lib/actions/transaction-actions';

const Dashboard = async () => {
  const session = await auth();
  const banks: Bank[] = await getBankAccounts(session?.user?.id) as Bank[];
  if (!banks || banks.length === 0) return;
  const res = await getAllTransactions(banks[0].id, {}, 7, 1, 7);


  return (
    <>
      <div className='h-full overflow-auto flex flex-col'>
        <div className='p-5 flex flex-col md:flex-row gap-5'>
          <TotalBalance bank={banks[0]} />
          <MoneyFlow bank={banks[0]} />
        </div>

        <div className='flex-1 overflow-auto pb-5 px-5'>
          <RecentTransactions transactions={res?.transactions} />
        </div>
      </div>
    </>
  )
}

export default Dashboard;