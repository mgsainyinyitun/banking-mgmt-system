'use client'
import { getMonthlyBalances } from '@/app/lib/actions/monthly-balance-action';
import { Bank } from '@/app/types/types';
import React, { useEffect, useState } from 'react'
import {
    ComposedChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface moneyFlowProps {
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

const MoneyFlow = ({ bank }: moneyFlowProps) => {
    const [data, setData] = useState<AccountSummary[]>([]);
    const [chartWidth, setChartWidth] = useState('100%');
    const [chartHeight, setChartHeight] = useState(250);

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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setChartWidth('100%');
                setChartHeight(200);
            } else if (window.innerWidth < 1024) {
                setChartWidth('100%');
                setChartHeight(250);
            } else {
                setChartWidth('100%');
                setChartHeight(300);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='bg-content1-900 rounded-2xl w-full h-full flex-1 p-4'>
            <ResponsiveContainer width={chartWidth} height={chartHeight}>
                <ComposedChart data={data}>
                    <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="month" 
                        tickFormatter={(month) => new Date(0, month - 1).toLocaleString('default', { month: 'short' })}
                        tick={{ fontSize: '0.8rem' }}
                    />
                    <YAxis tick={{ fontSize: '0.8rem' }} />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Area type="monotone" dataKey="balance" stroke="#8884d8" fill="url(#colorAmount)" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MoneyFlow
