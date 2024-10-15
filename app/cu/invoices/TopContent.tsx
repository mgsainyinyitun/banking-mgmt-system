'use client'
import { InvoiceFilter } from "@/app/types/types";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, DateValue, Input } from "@nextui-org/react";
import { useState } from "react";


interface topContentProps {
    filter: InvoiceFilter,
    setFilter: (prm: InvoiceFilter) => void,
}

const TopContent = ({ filter, setFilter }: topContentProps) => {

    const [startDate, setStartDate] = useState<DateValue>();
    const [endDate, setEndDate] = useState<DateValue>();
    const [searchValue, setSearchValue] = useState<string>("");



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
        setFilter({ ...filter, username: v })
    }
    const clear = () => {
        setSearchValue("");
        setFilter({ ...filter, username: undefined })
    }

    return (
        <div className="flex gap-4">
            <div className="flex flex-col md:flex-row w-full justify-between gap-3 items-end">
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search by username..."
                    startContent={<FontAwesomeIcon icon={faSearch} />}
                    value={searchValue}
                    onClear={clear}
                    fullWidth
                    onValueChange={searchValueChange}
                />
                <div className="flex flex-col md:flex-row gap-3">
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
            </div>
        </div>
    );
}
export default TopContent;