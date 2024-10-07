'use client'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
interface backgroundProps {
    children: React.ReactNode;
}

const Background = ({ children }: backgroundProps) => {
    const { theme } = useTheme();
    const [usertheme, setUserTheme] = useState<string>('light');

    useEffect(() => {
        if (theme) {
            setUserTheme(theme);
        }
    }, [theme])

    console.log('background theme is ;;;;;;;;',usertheme);
    return (
        <div className={`h-screen w-full 
            ${usertheme === 'light' ? 'bg-gradient-radial-circle from-pink-400 to-cyan-300' :
                'bg-gradient-radial-circle from-pink-700 to-blue-900'}`
        }>
            {children}
        </div>
    )
}

export default Background