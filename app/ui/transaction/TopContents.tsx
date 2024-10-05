'use client'
import { TransactionFilter } from "@/app/types/types";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, DateValue, Input, Selection } from "@nextui-org/react";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { useState } from "react";
import MutlipleDropdown from "../components/common/MutlipleDropdown";

const status_arr = Object.entries(TransactionStatus).map(([key, value]) => {
    return { name: value, uid: key }
});

const type_arr = Object.entries(TransactionType).map(([key, value]) => {
    return { name: value, uid: key }
});


interface topContentProps {
    filter: TransactionFilter,
    setFilter: (prm: TransactionFilter) => void,
}

const TopContent = ({ filter, setFilter }: topContentProps) => {

    const [statusFilter, setStatusFilter] = useState<Selection>('all');
    const [typeFilter, setTypeFilter] = useState<Selection>('all');
    const [startDate, setStartDate] = useState<DateValue>();
    const [endDate, setEndDate] = useState<DateValue>();

    const onFilterChange = (v: any, type: string) => {
        switch (type) {
            case "STATUS":
                setStatusFilter(v);
                const starr = Array.from(v) ? Array.from(v) : [];
                setFilter({ ...filter, transactionStatus: { in: starr } })
                break;
            case "TYPE":
                setTypeFilter(v);
                const tyarr = Array.from(v) ? Array.from(v) : [];
                setFilter({ ...filter, transactionType: { in: tyarr } })
                break;
            case "TO":
                setEndDate(v);
                setFilter({ ...filter, date: { lte: v.toDate() } })
                break;
            case "FROM":
                setStartDate(v);
                setFilter({ ...filter, date: { gte: v.toDate() } })
                break;
        }
    }


    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search by name..."
                    startContent={<FontAwesomeIcon icon={faSearch} />}
                    value={''}
                    onClear={() => { }}
                    onValueChange={() => { }}
                />
                <div className="flex gap-3">
                    <DatePicker
                        label='From'
                        className="max-w-[284px]"
                        labelPlacement="outside-left"
                        value={startDate}
                        onChange={(v: any) => onFilterChange(v, 'FROM')}
                    />
                    <DatePicker
                        label='To'
                        className="max-w-[284px]"
                        labelPlacement="outside-left"
                        value={endDate}
                        onChange={(v: any) => onFilterChange(v, 'TO')}
                    />

                    <MutlipleDropdown
                        filter={statusFilter}
                        onFilterChange={onFilterChange}
                        items={status_arr}
                        name="STATUS"
                    />
                    <MutlipleDropdown
                        filter={typeFilter}
                        onFilterChange={onFilterChange}
                        items={type_arr}
                        name="TYPE"
                    />

                </div>
            </div>
        </div>
    );
}
export default TopContent;