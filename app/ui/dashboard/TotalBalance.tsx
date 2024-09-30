import { faArrowTrendDown, faArrowTrendUp, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from '@nextui-org/react'
import React from 'react'

const TotalBalance = () => {
    return (
        <div className='flex flex-col'>

            <div className='flex flex-col gap-5 w-full flex-1 justify-center'>
                <div className='flex gap-5 justify-between items-center'>
                    <FontAwesomeIcon className='text-7xl text-primary-400' icon={faWallet} />
                    <div className='flex-1 flex flex-col gap-3'>
                        <h4 className='text-2xl font-bold text-primary-400'>Your Total Balance</h4>
                        <p className='text-gray-400'>Take a look at your statistic</p>
                        <h1 className='mt-3 text-4xl font-bold text-primary-400'>131193.563 <span className='text-lg'>MMK</span></h1>
                    </div>
                </div>
            </div>

            <div className='flex gap-5 justify-between'>
                <div className='bg-content1-900 rounded-2xl flex p-5 flex-1 justify-center items-center gap-3'>
                    <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faArrowTrendDown} />
                    <h3>Cash In</h3>
                </div>
                <div className='bg-content1-900 rounded-2xl flex p-5 flex-1 justify-center items-center gap-3'>
                    <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faArrowTrendUp} />
                    <h3>Cash Out</h3>
                </div>
            </div>
        </div>
    )
}

export default TotalBalance