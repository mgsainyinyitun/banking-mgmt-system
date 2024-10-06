import { Transaction } from '@/app/types/types';
import { faBank, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Chip } from '@nextui-org/react';
import { TransactionStatus, TransactionType, TransferType } from '@prisma/client';
import { Key } from 'react';

interface renderCellProps {
    columnKey: Key,
    item: Transaction,
}

export const renderCell = ({ columnKey, item }: renderCellProps) => {

    const cell = (columnKey: Key, item: Transaction) => {
        const cellValue = item[columnKey as keyof Transaction];
        const displayValue = cellValue instanceof Date ? cellValue.toLocaleDateString() : cellValue;
     
        switch (columnKey) {
            case "transaction_id":
                return (
                    <p className='text-center'>
                        {displayValue}
                    </p>
                );

            case "amount":
                const ty = item['transactionType'];
                const tr = item['transferType'];
                return (
                    <p className={`font-semibold w-full
                  ${ty === TransactionType.DEPOSIT || tr === TransferType.CASHIN ? 'text-green-500' :
                            ty === TransactionType.WITHDRAWAL || tr === TransferType.CASHOUT ? 'text-red-500' : ''
                        }`}>
                        {ty === TransactionType.DEPOSIT || tr === TransferType.CASHIN ? '+' : '-'}
                        {displayValue}

                    </p>
                );

            case "transactionType":
                return (
                    <div className='flex justify-center items-center'>
                        {displayValue}
                    </div>
                );

            case "date":
                return (
                    <div className='flex justify-center items-center'>
                        {displayValue}
                    </div>
                );


            case "transactionStatus":
                return (
                    <div className='flex justify-center items-center'>
                        <Chip
                            className={`capitalize text-white
                  ${cellValue === TransactionStatus.PENDING ? 'bg-gray-500' :
                                    cellValue === TransactionStatus.SUCCESS ? 'bg-success-500' : 'bg-danger-500'}
                  `}
                            color={'primary'}
                            size="sm"
                            variant="flat">
                            {displayValue}
                        </Chip>
                    </div>
                );


            case "account":
                const profile = item['transferAccountProfile'];
                if (profile) {
                    return (
                        <div className='flex justify-center'>
                            {profile && (<Avatar className='border-1 border-primary-400' src={profile} />)}
                            {!profile && (
                                <p className='text-center'>
                                    <FontAwesomeIcon icon={faUser} className='text-primary-400 border-1 border-primary-500 p-3 rounded-full' />
                                </p>)}
                        </div>
                    );
                }
                return (
                    <p className='text-center'>
                        <FontAwesomeIcon icon={faBank} className='text-primary-400 border-1 border-primary-500 p-3 rounded-full' />
                    </p>
                );

            case "description":
                return (
                    <p className='text-center'>
                        {displayValue}
                    </p>
                )
        }
    }
    return cell(columnKey, item);
}
