'use client'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
interface backgroundProps {
    children: React.ReactNode;
}

const Background = ({ children }: backgroundProps) => {
    const { theme } = useTheme();
    const [usertheme, setUserTheme] = useState('light');

    useEffect(() => {
        if (theme) {
            setUserTheme(theme);
        }
    }, [theme])

    return (
        <div className={`h-screen w-full ${usertheme === 'light' ? 'bg-gradient-radial-circle from-pink-400 to-cyan-300' : 'bbg-gray-500'}`}>
            {children}
        </div>
    )
}

export default Background