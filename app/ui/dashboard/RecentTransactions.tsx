'use client'
import { TRANSACTION_COLUMNS } from '@/app/constants/CONSTANTS'
import { Transaction } from '@/app/types/types'
import { faBank } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { TransactionType } from '@prisma/client'
import { convertToDisplayData } from '../transaction/common'

interface recentTransactionProps {
  transactions: Transaction[] | undefined
}

const RecentTransactions = ({ transactions }: recentTransactionProps) => {
  const renderCell = (columnKey: any, item: any) => {
    const cellValue = item[columnKey] ? item[columnKey] : '';
    switch (columnKey) {
      case "transactionStatus":
        return (
          <Chip className="capitalize" color={'primary'} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "amount":
        return (
          <p className={`font-semibold w-full
            ${item['transactionType'] === TransactionType.DEPOSIT.toString() ? 'text-green-500' : ''}`}>
            {item['transactionType'] === TransactionType.DEPOSIT.toString() ? '+' : '-'}

            {cellValue}

          </p>
        );
      case "transaction_id":
        return (
          <p className='text-center'>
            {cellValue}
          </p>
        );

      case "account":
        return (
          <p className='text-center'>
            <FontAwesomeIcon icon={faBank} className='text-primary-400 border-1 border-primary-500 p-3 rounded-full' />
          </p>
        );
    }
  }
  return (
    <Table className='h-full w-full bg-content1-900 p-3 rounded-2xl overflow-auto' removeWrapper>
      <TableHeader columns={TRANSACTION_COLUMNS}>
        {
          (column) => (
            <TableColumn key={column.value}
              className={`min-w-5 max-w-14 text-center`}>
              {column.name}
            </TableColumn>
          )
        }
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} items={convertToDisplayData(transactions)}>
        {
          (item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(columnKey, item)}</TableCell>}
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}

export default RecentTransactions