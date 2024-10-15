'use client'
import { Card, CardBody, CardHeader, Tooltip } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Legend, Line, LineChart, ResponsiveContainer } from 'recharts'

const mockData = [
    { month: 'Jan', users: 30, customers: 20, admins: 5, tellers: 5 },
    { month: 'Feb', users: 45, customers: 30, admins: 8, tellers: 7 },
    { month: 'Mar', users: 60, customers: 40, admins: 10, tellers: 10 },
    { month: 'Apr', users: 75, customers: 50, admins: 12, tellers: 13 },
    { month: 'May', users: 90, customers: 60, admins: 15, tellers: 15 },
    { month: 'Jun', users: 105, customers: 70, admins: 18, tellers: 17 },
];

const UserGrowth = () => {
    const [chartWidth, setChartWidth] = useState('100%');
    const [chartHeight, setChartHeight] = useState(250);

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
        <Card className="bg-content1-900 p-5 rounded-2xl shadow-xl text-primary-500">
            <CardHeader className="text-2xl font-bold">User Growth</CardHeader>
            <CardBody>
                <ResponsiveContainer width={chartWidth} height={chartHeight}>
                    <LineChart data={mockData}>
                        <Line type="monotone" dataKey="users" stroke="#8884d8" />
                        <Line type="monotone" dataKey="customers" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="admins" stroke="#ffc658" />
                        <Line type="monotone" dataKey="tellers" stroke="#ff7300" />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    )
}

export default UserGrowth