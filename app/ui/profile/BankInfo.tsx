import { formatNumberToGroupsOfFour } from '@/app/lib/utils'
import { Bank } from '@/app/types/types'
import { faBank, faCalendar, faCircleArrowUp, faLeaf, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@nextui-org/react'
import React from 'react'

interface bankInfoProps {
    bank: Bank[]
}

const BankInfo = ({ bank }: bankInfoProps) => {
    const bankInfo = bank[0] ? bank[0] : [] as Bank;

    return (
        <div className="flex flex-col gap-5 p-5 bg-content1-900 rounded-2xl w-full md:w-2/3 mx-auto h-full">
            <h1 className='text-3xl text-blue-300 font-semibold my-3'>Bank Account Infomation : </h1>
            <Input
                radius='sm'
                size='lg'
                type='text'
                label={"Account Holder Name"}
                labelPlacement="outside"
                startContent={
                    <FontAwesomeIcon icon={faUser} className='text-sky-400' />
                }
                defaultValue={bankInfo.account_name}
                readOnly
            />

            <Input
                radius='sm'
                size='lg'
                type='text'
                label={"Band Account Number"}
                labelPlacement="outside"
                startContent={
                    <FontAwesomeIcon icon={faBank} className='text-sky-400' />
                }
                defaultValue={formatNumberToGroupsOfFour(bankInfo.accountNumber)}
                readOnly
            />
            <Input
                radius='sm'
                size='lg'
                type='text'
                label={"Account Type"}
                labelPlacement="outside"
                startContent={
                    <FontAwesomeIcon icon={faLeaf} className='text-sky-400' />
                }
                defaultValue={bankInfo.accountType}
                readOnly
            />

            <Input
                radius='sm'
                size='lg'
                type='text'
                label={"Account Status"}
                labelPlacement="outside"
                startContent={
                    <FontAwesomeIcon icon={faCircleArrowUp} className='text-green-400' />
                }
                defaultValue={bankInfo.accountStatus}
                readOnly
            />

            <Input
                radius='sm'
                size='lg'
                type='text'
                label={"Account Open At"}
                labelPlacement="outside"
                startContent={
                    <FontAwesomeIcon icon={faCalendar} className='text-sky-400' />
                }
                defaultValue={bankInfo.accountOpenedAt?.toDateString()}
                readOnly
            />
        </div>
    )
}

export default BankInfo