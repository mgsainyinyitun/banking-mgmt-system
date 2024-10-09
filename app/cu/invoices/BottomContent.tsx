import { Button, Pagination } from '@nextui-org/react'
import React from 'react'

interface BottomContentProps {
    totoalItem: number | undefined,
    page: number,
    totalPages: number,
    onChange: (n: number) => void,
}

const BottomContent = ({ totoalItem, page, totalPages, onChange }: BottomContentProps) => {
    return (
        <div className="py-2 px-2 mt-auto flex justify-between items-center">
            <p>Total Invoices: {totoalItem}</p>
            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={totalPages}
                onChange={onChange}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
                <Button size="sm" isDisabled={page === 1} variant="flat" onClick={() => onChange(page - 1)}>
                    Previous
                </Button>
                <Button isDisabled={page === totalPages} size="sm" variant="flat" onClick={() => onChange(page + 1)}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default BottomContent