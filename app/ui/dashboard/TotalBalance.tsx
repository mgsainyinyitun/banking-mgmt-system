import { Bank } from '@/app/types/types'
import { faArrowTrendDown, faArrowTrendUp, faRightLeft, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

interface totalBalanceProps {
    bank: Bank | undefined
}

const TotalBalance = ({ bank }: totalBalanceProps) => {
    if (!bank) return;
    return (
        <div className='flex flex-col'>

            <div className='flex flex-col gap-5 w-full flex-1 justify-center'>
                <div className='flex gap-5 justify-between items-center'>
                    <FontAwesomeIcon className='text-7xl text-primary-400' icon={faWallet} />
                    <div className='flex-1 flex flex-col gap-1'>
                        <h4 className='text-2xl font-bold text-primary-400'>Your Total Balance</h4>
                        <p className='text-gray-400'>Take a look at your statistic</p>
                        <div>
                            <p className='text-gray-500'>Balance : </p>
                            <h1 className=' text-2xl font-bold text-primary-400'> {bank.balance} <span className='text-lg'>MMK</span></h1>
                            <p className='text-gray-500'>Available Balance : </p>
                            <h1 className=' text-2xl font-bold text-primary-400'>{bank.availableBalance} <span className='text-lg'>MMK</span></h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex gap-5 justify-between'>
                <Link href='/cu/transaction/deposit' className='hover:shadow-lg hover:bg-sky-300 rounded-2xl'>
                    <div className='bg-content1-900 rounded-2xl flex p-5 flex-1 justify-center items-center gap-3 flex-col'>
                        <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faArrowTrendDown} />
                        <h3>Deposit</h3>
                    </div>
                </Link>
                <Link href='/cu/transaction/transfer' className='hover:shadow-lg hover:bg-sky-300 rounded-2xl'>
                    <div className='bg-content1-900 rounded-2xl flex p-5 flex-1 justify-center items-center gap-3 flex-col'>
                        <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faRightLeft} />
                        <h3>Transfer</h3>
                    </div>
                </Link>
                <Link href='/cu/transaction/withdrawal' className='hover:shadow-lg hover:bg-sky-300 rounded-2xl'>
                    <div className='bg-content1-900 rounded-2xl flex p-5 flex-1 justify-center items-center gap-3 flex-col'>
                        <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faArrowTrendUp} />
                        <h3>Withdraw</h3>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default TotalBalance