'use client'
import { DEFAULT_PROFILE, TRANSACTION_COLUMNS } from '@/app/constants/CONSTANTS'
import { Transaction, TransactionFilter } from '@/app/types/types'
import { faBank } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Button, Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { TransactionType } from '@prisma/client'
import { convertToDisplayData } from './common'
import { useEffect, useMemo, useState } from 'react'
import { getAllTransactions } from '@/app/lib/actions/transaction-actions'
import TopContent from './TopContents'

interface transactionTableProps {
  transactions: Transaction[] | undefined,
  total: number | undefined,
  id: number | undefined
}

const TransactionTable = ({ transactions, total, id }: transactionTableProps) => {

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

    const rtn = item[columnKey] ? item[columnKey] : '';

    if (rtn) {
      return <p className='w-full'>{rtn}</p>;
    }
  }
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const [totalItm, setTotalItem] = useState(total);
  const [totalPages, setTotalPages] = useState(total ? Math.ceil(total / pageSize) : 1);
  const [filter, setFilter] = useState<TransactionFilter>({});
  const [dbtransactions, setTransactions] = useState(transactions);


  // let totalPages = total ? Math.ceil(total / pageSize) : 1;

  const refetch = async () => {
    const res = await getAllTransactions(id, filter, pageSize, page, pageSize);
    if (res?.success) {
      setTransactions(res.transactions);
      res.total && setTotalPages(Math.ceil(res.total / pageSize));
      res.total && setTotalItem(res.total);
    }
  }

  useEffect(() => {
    if (page >= 1) {
      refetch();
    }
  }, [page, filter]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 mt-auto flex justify-between items-center">
        <p>Total Transactions: {totalItm}</p>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button size="sm" isDisabled={page === 1} variant="flat" onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <Button isDisabled={page === totalPages} size="sm" variant="flat" onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, filter,totalPages,totalItm]);

  const top = useMemo(() => {
    return <TopContent filter={filter} setFilter={setFilter} />
  }, [page,filter,totalPages,totalItm]);

  return (
    <Table
      className='h-full w-full bg-content1-900 p-3 rounded-2xl overflow-auto'
      removeWrapper
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      topContent={top}
      topContentPlacement="outside"
    >
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
      <TableBody emptyContent={"No rows to display."} items={convertToDisplayData(dbtransactions)}>
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

export default TransactionTable