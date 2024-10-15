'use client'
import { Card, CardBody, CardHeader, Tooltip } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, Legend, ResponsiveContainer, XAxis } from 'recharts'

const mockMoneyFlowData = [
    { month: 'Jan', flowIn: 4000, flowOut: 2400 },
    { month: 'Feb', flowIn: 3000, flowOut: 1398 },
    { month: 'Mar', flowIn: 2000, flowOut: 9800 },
    { month: 'Apr', flowIn: 2780, flowOut: 3908 },
    { month: 'May', flowIn: 1890, flowOut: 4800 },
    { month: 'Jun', flowIn: 2390, flowOut: 3800 },
];

const MoneyFlow = () => {

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
        < Card className="bg-content1-900 p-5 rounded-2xl shadow-xl text-primary-500 col-span-3" >
            <CardHeader className="text-2xl font-bold">Money Flow</CardHeader>
            <CardBody>
                <ResponsiveContainer width={chartWidth} height={chartHeight}>
                    <AreaChart data={mockMoneyFlowData}>
                        <XAxis
                            dataKey="month"
                            label={{ value: 'Month', position: 'insideBottomRight', offset: -5 }}
                            tickFormatter={(month) => month}
                        />
                        <Area type="monotone" dataKey="flowIn" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="flowOut" stroke="#8884d8" fill="#8884d8" />
                        <Tooltip />
                        <Legend />
                    </AreaChart>
                </ResponsiveContainer>
            </CardBody>
        </Card >
    )
}

export default MoneyFlow