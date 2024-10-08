'use client'
import { TRANSACTION_COLUMNS } from '@/app/constants/CONSTANTS'
import { Transaction } from '@/app/types/types'
import {  Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { convertToDisplayData } from '../transaction/common'
import { renderCell } from '../transaction/RenderCell'

interface recentTransactionProps {
  transactions: Transaction[] | undefined
}

const RecentTransactions = ({ transactions }: recentTransactionProps) => {
  
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
              {(columnKey) => <TableCell>{renderCell({columnKey, item})}</TableCell>}
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}

export default RecentTransactions