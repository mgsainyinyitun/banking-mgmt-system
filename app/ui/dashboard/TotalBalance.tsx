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

            <div className='flex flex-col gap-3 sm:gap-5 w-full flex-1 justify-center'>
                <div className='flex gap-3 sm:gap-5 justify-between items-center'>
                    <FontAwesomeIcon className='text-4xl sm:text-5xl md:text-7xl text-primary-400' icon={faWallet} />
                    <div className='flex-1 flex flex-col gap-1'>
                        <h4 className='text-lg sm:text-xl md:text-2xl font-bold text-primary-400'>Your Total Balance</h4>
                        <p className='text-xs sm:text-sm text-gray-400'>Take a look at your statistic</p>
                        <div>
                            <p className='text-xs sm:text-sm text-gray-500'>Balance : </p>
                            <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-primary-400'> {bank.balance} <span className='text-sm sm:text-base md:text-lg'>MMK</span></h1>
                            <p className='text-xs sm:text-sm text-gray-500'>Available Balance : </p>
                            <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-primary-400'>{bank.availableBalance} <span className='text-sm sm:text-base md:text-lg'>MMK</span></h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 sm:gap-5 justify-between mt-3 sm:mt-5'>
                <Link href='/cu/transaction/deposit' className='flex-1 hover:shadow-lg hover:bg-sky-300 rounded-xl sm:rounded-2xl'>
                    <div className='bg-content1-900 rounded-xl sm:rounded-2xl flex p-2 sm:p-3 md:p-5 justify-center items-center gap-1 sm:gap-2 md:gap-3 flex-col'>
                        <FontAwesomeIcon className='text-primary-400 text-xl sm:text-2xl md:text-3xl' icon={faArrowTrendDown} />
                        <h3 className='text-xs sm:text-sm md:text-base'>Deposit</h3>
                    </div>
                </Link>
                <Link href='/cu/transaction/transfer' className='flex-1 hover:shadow-lg hover:bg-sky-300 rounded-xl sm:rounded-2xl'>
                    <div className='bg-content1-900 rounded-xl sm:rounded-2xl flex p-2 sm:p-3 md:p-5 justify-center items-center gap-1 sm:gap-2 md:gap-3 flex-col'>
                        <FontAwesomeIcon className='text-primary-400 text-xl sm:text-2xl md:text-3xl' icon={faRightLeft} />
                        <h3 className='text-xs sm:text-sm md:text-base'>Transfer</h3>
                    </div>
                </Link>
                <Link href='/cu/transaction/withdrawal' className='flex-1 hover:shadow-lg hover:bg-sky-300 rounded-xl sm:rounded-2xl'>
                    <div className='bg-content1-900 rounded-xl sm:rounded-2xl flex p-2 sm:p-3 md:p-5 justify-center items-center gap-1 sm:gap-2 md:gap-3 flex-col'>
                        <FontAwesomeIcon className='text-primary-400 text-xl sm:text-2xl md:text-3xl' icon={faArrowTrendUp} />
                        <h3 className='text-xs sm:text-sm md:text-base'>Withdraw</h3>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default TotalBalance