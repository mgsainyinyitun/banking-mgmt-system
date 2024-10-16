'use server'
import { getAllUsers } from '@/app/lib/actions/admin-actions';
import UserTable from './UserTable'; // Import the new UserTable component

const UsersPage = async () => {
    const pageSize = 10;
    const page = 1; // Initial page can be managed by UserTable

    const res = await getAllUsers({}, pageSize, page, pageSize);

    if (!res?.success) {
        // Handle error appropriately
    }

    return (
        <UserTable 
            initialUsers={res.users} 
            initialTotalUsers={res.total} 
            initialTotalPages={Math.ceil(res.total / pageSize)} 
        />
    );
};

export default UsersPage;
