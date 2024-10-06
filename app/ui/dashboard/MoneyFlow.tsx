'use client'
import { getMonthlyBalances } from '@/app/lib/actions/monthly-balance-action';
import { Bank } from '@/app/types/types';
import React, { useEffect } from 'react'
import {
    ComposedChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface moneyFlowPrpos {
    bank: Bank | undefined
}

interface AccountSummary {
    month: number;
    year: number;
    balance: number;
}

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

const allMonths = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    year: currentYear,
    balance: 0,
}));

const MoneyFlow = ({ bank }: moneyFlowPrpos) => {

    const [data, setData] = React.useState<AccountSummary[]>([]);

    const fetchData = async () => {
        if (!bank?.id) return;
        const data = await getMonthlyBalances(bank?.id);
        data.forEach(record => {
            const monthIndex = record.month - 1;
            allMonths[monthIndex].balance = record.balance;
        });

        const filteredData = allMonths.filter(monthRecord => {
            return monthRecord.year < currentYear ||
                (monthRecord.year === currentYear && monthRecord.month <= currentMonth);
        });
        setData(filteredData);
    };

    useEffect(() => {
        fetchData();
    }, [bank?.id]);
    return (
        <div className='bg-content1-900 rounded-2xl w-full h-[250px] flex-1'>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data}>
                    <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={(month) => new Date(0, month - 1).toLocaleString('default', { month: 'short' })} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Area type="monotone" dataKey="balance" stroke="#8884d8" fill="url(#colorAmount)" />
                    {/* <Bar dataKey="amount" barSize={10} fill="#82ca9d" /> */}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MoneyFlow


