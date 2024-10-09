'use client';

import { Key, useEffect, useMemo, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Link } from "@nextui-org/react";
import { Invoice, InvoiceFilter } from '@/app/types/types';
import { DEFAULT_PROFILE, INVOICE_COLUMNS } from '@/app/constants/CONSTANTS';
import { InvoiceType } from '@prisma/client';
import BottomContent from './BottomContent';
import TopContent from './TopContent';

function padInvoiceId(id: number): string {
    return id.toString().padStart(6, '0');
}

export default function InvoiceList({ userId }: { userId: string | undefined }) {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const pageSize = 10;
    const [page, setPage] = useState<number>(1);
    const [totalItem, setTotalItem] = useState(0);
    const [totalPages, setTotalPages] = useState(totalItem !== 0 ? Math.ceil(totalItem / pageSize) : 0);
    const [filter, setFilter] = useState<InvoiceFilter>({});

    const fecthInvoices = async (userId: string) => {
        const response = await fetch(`/api/invoices?userId=${userId}&username=${filter.username}&gte=${filter.date?.gte}&let=${filter.date?.lte}`);
        const data = await response.json() as Invoice[];
        if (invoices) {
            setInvoices(data);
            setTotalItem(data.length);
            setTotalPages(data.length !== 0 ? Math.ceil(data.length / pageSize) : totalPages);
        }
    }

    useEffect(() => {
        if (!userId) {
            console.error('User ID not found in session');
            return;
        }
        fecthInvoices(userId,);

    }, [userId, page, filter]);

    const renderCell = (columnKey: Key, item: Invoice) => {
        const cell = item[columnKey as keyof Invoice];

        switch (columnKey) {
            case "id":
                return (
                    <p className='text-center'>
                        # Inv-{cell ? padInvoiceId(Number(cell)) : ''}
                    </p>
                );
            case "transferAccount":
                const pic = item.transferAccountProfile;
                return (
                    <span className='flex gap-1 justify-center items-center'>
                        <Chip
                            variant="flat"
                            avatar={
                                <Avatar
                                    name="JW"
                                    src={pic ? pic : DEFAULT_PROFILE}
                                />
                            }
                        >
                            {cell?.toString()}
                        </Chip>
                    </span>
                );
            case "amount":
                const st = item.type;
                return (
                    <span className={`${st === InvoiceType.RECEIVE ? 'text-green-500' : 'text-red-500'} text-center flex justify-center items-center`}>
                        {st === InvoiceType.RECEIVE ? '+' : '-'} {cell?.toString()}
                    </span>
                );
            case "type":
                return (
                    <span className='flex justify-center items-center'>
                        <Chip>{cell?.toString()}</Chip>
                    </span>
                )
            case "status":
                return (
                    <span className='flex justify-center items-center'>
                        <Chip>
                            {cell?.toString()}
                        </Chip>
                    </span>
                );
            case "details":
                return (
                    <span className='flex justify-center items-center'>
                        <Chip>
                            <Link href={`/cu/invoices/${item.id}`}>
                                Details
                            </Link>
                        </Chip>
                    </span>
                );

            default: return <div className='text-center'>{cell?.toString()}</div>;
        }
    }

    const top = useMemo(() => {
        return <TopContent filter={filter} setFilter={setFilter} />
    }, [filter]);


    const bottomContent = useMemo(() => {
        return <BottomContent
            totalPages={totalPages}
            page={page}
            totoalItem={totalItem}
            onChange={setPage}
        />
    }, [page, totalPages, totalItem]);

    return (
        <Table
            className='h-full w-full bg-content1-900 p-3 rounded-2xl overflow-auto'
            removeWrapper
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            topContent={top}
            topContentPlacement="outside"
            fullWidth
            layout='auto'
        >
            <TableHeader columns={INVOICE_COLUMNS}>
                {
                    (column) => (
                        <TableColumn key={column.value}
                            className={`min-w-5 max-w-14 text-center`}>
                            {column.name}
                        </TableColumn>
                    )
                }
            </TableHeader>
            <TableBody emptyContent={"No rows to display."} items={invoices}>
                {
                    (item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(columnKey, item)}</TableCell>}
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
}