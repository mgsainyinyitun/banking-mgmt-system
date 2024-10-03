import { formatNumberToGroupsOfFour } from '@/app/lib/utils'
import { Bank } from '@/app/types/types'
import Image from 'next/image'
import React from 'react'

interface CreditCartProps {
    bank: Bank | undefined
}
const CreditCart = ({ bank }: CreditCartProps) => {
    return (
        <div className="max-w-sm mx-auto hover:shadow-2xl">
            <div className="relative bg-gradient-to-r from-pink-400 to-indigo-300 rounded-xl text-white shadow-lg p-6">

                <div className="absolute top-4 right-4">
                    <Image
                        src="/icons/zai-logo.png"
                        alt="Card Type"
                        width={40}
                        height={40}
                    />
                </div>

                <div className="mt-14 mb-8">
                    <h1 className="text-2xl tracking-widest font-semibold">{formatNumberToGroupsOfFour(bank?.accountNumber)}</h1>
                </div>


                <div className="flex justify-between mt-4">
                    <div className="text-sm">
                    </div>
                    <div className="text-sm font-semibold">
                        <p className="font-semibold">ACCOUNT NAME</p>
                        <p>{bank?.account_name}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreditCart