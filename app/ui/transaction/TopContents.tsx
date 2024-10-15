'use client'
import { TransactionFilter } from "@/app/types/types";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, DateValue, Input, Selection, SharedSelection } from "@nextui-org/react";
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
    const [searchValue, setSearchValue] = useState<string>("");

    const onFilterChange = (v: SharedSelection, type: string) => {
        switch (type) {
            case "STATUS":
                setStatusFilter(v);
                const starr: string[] = Array.from(v) ? Array.from(v) as string[] : [];
                setFilter({ ...filter, transactionStatus: { in: starr as TransactionStatus[] } })
                break;
            case "TYPE":
                setTypeFilter(v);
                const tyarr: string[] = Array.from(v) ? Array.from(v) as string[] : [];
                setFilter({ ...filter, transactionType: { in: tyarr as TransactionType[] } })
                break;
        }
    }

    const onFilterDateChange = (v: DateValue, type: string) => {
        const jsDate = new Date(v.year, v.month - 1, v.day);
        switch (type) {
            case "TO":
                setEndDate(v);
                setFilter({ ...filter, date: { lte: jsDate, gte: filter.date?.gte } })
                break;
            case "FROM":
                setStartDate(v);
                setFilter({ ...filter, date: { gte: jsDate, lte: filter.date?.lte } })
                break;
        }
    }


    const searchValueChange = (v: string) => {
        setSearchValue(v);
        setFilter({ ...filter, transaction_id: { contains: v } })
    }
    const clear = () => {
        setSearchValue("");
        setFilter({ ...filter, transaction_id: { contains: "" } })
    }

    return (
        <div className="flex gap-4">
            <div className="flex flex-col md:flex-row w-full justify-between gap-3 items-end">
                <Input
                    isClearable
                    className="w-full"
                    placeholder="Search by transaction id..."
                    startContent={<FontAwesomeIcon icon={faSearch} />}
                    value={searchValue}
                    onClear={clear}
                    fullWidth
                    onValueChange={searchValueChange}
                />
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex gap-3">
                        <DatePicker
                            label='From'
                            className="max-w-[284px]"
                            labelPlacement="outside-left"
                            value={startDate}
                            onChange={(v: DateValue) => {
                                onFilterDateChange(v, 'FROM')
                            }}
                        />
                        <DatePicker
                            label='To'
                            className="max-w-[284px]"
                            labelPlacement="outside-left"
                            value={endDate}
                            onChange={(v) => onFilterDateChange(v, 'TO')}
                        />
                    </div>
                    <div className="flex gap-3">
                        <MutlipleDropdown
                            filter={statusFilter}
                            onFilterChange={onFilterChange}
                            items={status_arr as []}
                            name="STATUS"
                        />
                        <MutlipleDropdown
                            filter={typeFilter}
                            onFilterChange={onFilterChange}
                            items={type_arr as []}
                            name="TYPE"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
export default TopContent;