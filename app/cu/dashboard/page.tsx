import React from 'react'
import TotalBalance from '../../ui/dashboard/TotalBalance';
import MoneyFlow from '../../ui/dashboard/MoneyFlow';
import RecentTransactions from '../../ui/dashboard/RecentTransactions';
import AppBar from '../../ui/appbar/AppBar';

const Dashboard = async () => {

  return (
    <>
      <div className='h-full overflow-auto flex flex-col'>
        <div className='p-5 flex flex-col md:flex-row gap-5'>
          <TotalBalance />
          <MoneyFlow />
        </div>

        <div className='flex-1 overflow-auto pb-5 px-5'>
          <RecentTransactions />
        </div>
      </div>
    </>
  )
}

export default Dashboard;