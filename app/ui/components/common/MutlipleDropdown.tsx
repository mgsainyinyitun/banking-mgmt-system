import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

interface multiDropProps {
    items: any[],
    filter: any | 'all',
    onFilterChange: (v:any, name: string) => void,
    name: string,
}

const MutlipleDropdown = ({ items, filter, onFilterChange, name }: multiDropProps) => {

    return (
        <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FontAwesomeIcon icon={faChevronDown} />} variant="flat">
                    {name}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={filter}
                selectionMode="multiple"
                onSelectionChange={(v: any) => onFilterChange(v, name)}
            >
                {items.map((status: any) => (
                    <DropdownItem key={status.uid} className="capitalize">
                        {status.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

export default MutlipleDropdown