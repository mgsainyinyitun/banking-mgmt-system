'use client'
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Selection } from "@nextui-org/react";
import { TransactionStatus } from "@prisma/client";
import { useMemo, useState } from "react";


const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "AGE", uid: "age", sortable: true },
    { name: "ROLE", uid: "role", sortable: true },
    { name: "TEAM", uid: "team" },
    { name: "EMAIL", uid: "email" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

const status_arr = Object.entries(TransactionStatus).map(([key, value]) => {
    return { name: value, uid: key }
});

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

const TopContent = () => {
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));

    const [statusFilter, setStatusFilter] = useState<Selection>("all");

    console.log(TransactionStatus);

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
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<FontAwesomeIcon icon={faChevronDown} />} variant="flat">
                                Status
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectedKeys={statusFilter}
                            selectionMode="multiple"
                            onSelectionChange={setStatusFilter}
                        >
                            {status_arr.map((status: any) => (
                                <DropdownItem key={status.uid} className="capitalize">
                                    {status.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<FontAwesomeIcon icon={faChevronDown} />} variant="flat">
                                Columns
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectedKeys={visibleColumns}
                            selectionMode="multiple"
                            onSelectionChange={setVisibleColumns}
                        >
                            {columns.map((column) => (
                                <DropdownItem key={column.uid} className="capitalize">
                                    {column.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                </div>
            </div>
        </div>
    );
}
export default TopContent;