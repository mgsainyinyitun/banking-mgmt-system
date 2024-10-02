import AppBar from '@/app/ui/appbar/AppBar';
import MoneyFlow from '@/app/ui/dashboard/MoneyFlow';
import RecentTransactions from '@/app/ui/dashboard/RecentTransactions';
import TotalBalance from '@/app/ui/dashboard/TotalBalance';
import React from 'react'

const Dashboard = async() => {

  return (
    <div className='w-full bg-content1-900 rounded-2xl flex flex-col h-full overflow-hidden'>
      <div>
        <AppBar />
      </div>

      <div className='h-full overflow-auto flex flex-col'>
        <div className='p-5 flex flex-col md:flex-row gap-5'>
          <TotalBalance />
          <MoneyFlow />
        </div>

        <div className='flex-1 overflow-auto pb-5 px-5'>
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;