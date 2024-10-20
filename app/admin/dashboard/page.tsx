import UserCountCards from './UserCountCards';
import UserGrowth from './UserGrowth';
import MoneyFlow from './MoneyFlow';
import { getUserCounts } from '@/app/lib/actions/admin-actions';
import React from 'react';

const AdminDashboard = async () => {
    const { adminCount, customerCount, tellerCount, total } = await getUserCounts();

    return (
        <div className="flex flex-col items-center p-5 h-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full h-full overflow-auto">
                <UserCountCards 
                    totalUsers={total} 
                    totalAdmins={adminCount} 
                    totalTellers={tellerCount} 
                    totalCustomers={customerCount} 
                />
                <UserGrowth />
                <MoneyFlow />
            </div>
        </div>
    );
};

export default AdminDashboard;
