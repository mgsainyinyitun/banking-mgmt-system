'use client'

import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Pagination, Avatar, Chip, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllUsers, deleteUser } from '@/app/lib/actions/admin-actions';
import { User, UserList } from '@/app/types/types';
import { ACCOUNT_TYPE } from '@prisma/client';

interface UserTableProps {
    initialUsers: UserList[];
    initialTotalUsers: number;
    initialTotalPages: number;
}

const UserTable: React.FC<UserTableProps> = ({ initialUsers, initialTotalUsers, initialTotalPages }) => {
    const pageSize = 10;
    const [page, setPage] = useState<number>(1);
    const [totalUsers, setTotalUsers] = useState<number>(initialTotalUsers);
    const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
    const [users, setUsers] = useState<UserList[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [accountTypeFilter, setAccountTypeFilter] = useState<ACCOUNT_TYPE | undefined>(undefined);
    const router = useRouter();

    const fetchUsers = async (currentPage: number) => {
        const res = await getAllUsers({}, pageSize, currentPage, pageSize);
        if (res?.success) {
            setUsers(res.users as UserList[]);
            setTotalUsers(res.total);
            setTotalPages(Math.ceil(res.total / pageSize));
        }
    };

    useEffect(() => {
        console.log(page)
        if (page !== 1) { // Initial page data is already loaded
            fetchUsers(page);
        }
    }, [page]);

    const handleEditUser = (id: string | undefined) => {
        router.push(`/admin/users/edit/${id}`);
    };

    const handleViewUser = (id: string | undefined) => {
        router.push(`/admin/users/details/${id}`);
    };

    const handleDeleteUser = async (id: string | undefined) => {
        if (id) {
            const res = await deleteUser(id);
            if (res?.success) {
                fetchUsers(page); // Refresh the user list after deletion
            } else {
                // Handle error appropriately
            }
        }
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearchTerm = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.bankAccounts.some(account => account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesAccountType = accountTypeFilter ? user.type === accountTypeFilter : true;
            return matchesSearchTerm && matchesAccountType;
        });
    }, [users, searchTerm, accountTypeFilter]);

    const bottomContent = useMemo(() => (
        <div className="py-2 px-2 mt-auto flex justify-between items-center">
            <p>Total Users: {totalUsers}</p>
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
    ), [page, totalPages, totalUsers]);

    const getChipColor = (type: ACCOUNT_TYPE) => {
        switch (type) {
            case ACCOUNT_TYPE.ADMIN:
                return 'primary';
            case ACCOUNT_TYPE.CUSTOMER:
                return 'success';
            case ACCOUNT_TYPE.TELLER:
                return 'warning';
            default:
                return 'default';
        }
    };

    const topContent = (
        <div className="flex justify-between items-center mb-4">
            <Input
                isClearable
                placeholder="Search by username or bank account ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="flat">Filter by Account Type</Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Account Type"
                    onAction={(key) => {
                        if (key === 'all') {
                            setAccountTypeFilter(undefined);
                        } else {
                            setAccountTypeFilter(key as ACCOUNT_TYPE);
                        }
                    }}
                >
                    <DropdownItem key={ACCOUNT_TYPE.ADMIN}>Admin</DropdownItem>
                    <DropdownItem key={ACCOUNT_TYPE.CUSTOMER}>Customer</DropdownItem>
                    <DropdownItem key={ACCOUNT_TYPE.TELLER}>Teller</DropdownItem>
                    <DropdownItem key="all">All</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 h-full">
            <Table
                className='h-full w-full bg-content1-900 p-3 rounded-2xl overflow-auto'
                removeWrapper
                topContent={topContent}
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                topContentPlacement='outside'
                fullWidth
                layout='auto'
            >
                <TableHeader>
                    <TableColumn>Username</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Phone</TableColumn>
                    <TableColumn>Account Type</TableColumn>
                    <TableColumn>Bank Account Number</TableColumn>
                    <TableColumn>Bank Account Name</TableColumn>
                    <TableColumn>Detail</TableColumn>
                    <TableColumn>Edit</TableColumn>
                    <TableColumn>Delete</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No users to display."} items={filteredUsers}>
                    {(user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center">
                                    <Avatar src={user.profileImage || ''} alt={user.username} />
                                    <span className="ml-2">{user.username}</span>
                                </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>
                                <Chip color={getChipColor(user.type)}>{user.type}</Chip>
                            </TableCell>
                            <TableCell>
                                {user.bankAccounts.map((account, index) => (
                                    <div key={index}>
                                        <p>{account.accountNumber}</p>
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>
                                {user.bankAccounts.map((account, index) => (
                                    <div key={index}>
                                        <p>{account.account_name}</p>
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>
                                <Button size="sm" onClick={() => handleViewUser(user.id)}>Detail</Button>
                            </TableCell>
                            <TableCell>
                                <Button size="sm" onClick={() => handleEditUser(user.id)}>Edit</Button>
                            </TableCell>
                            <TableCell>
                                <Button size="sm" color="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserTable;
