'use client'
import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, addUser, updateUser } from '@/app/lib/actions/admin-actions';
import { UserInfo } from '@/app/types/types';
import { Button, Modal, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

const User = () => {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
    const [formData, setFormData] = useState({ username: '', email: '', /* other fields */ });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await getAllUsers();
        if (res?.success) {
            setUsers(res.users);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteUser(id);
        fetchUsers();
    };

    const handleAdd = async () => {
        await addUser(formData);
        setIsModalOpen(false);
        fetchUsers();
    };

    const handleEdit = async () => {
        if (currentUser) {
            await updateUser(currentUser.id as string, formData);
            setIsModalOpen(false);
            fetchUsers();
        }
    };

    return (
        <div className='p-5'>
            <h1 className='text-3xl font-bold mb-5'>User Management</h1>
            <Button onClick={() => { setIsModalOpen(true); setCurrentUser(null); }}>Add New User</Button>
            <Table>
                <TableHeader>
                    <TableColumn>Username</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Button onClick={() => { setCurrentUser(user); setIsModalOpen(true); }}>Edit</Button>
                                <Button color="danger" onClick={() => handleDelete(user.id as string)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalHeader>
                    <h2>{currentUser ? 'Edit User' : 'Add New User'}</h2>
                </ModalHeader>
                <ModalBody>
                    <Input
                        label="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <Input
                        label="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {/* Add more input fields as needed */}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={currentUser ? handleEdit : handleAdd}>
                        {currentUser ? 'Update' : 'Add'}
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default User;