'use client'
import { useState } from 'react';

export default function RightSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-[100%]">
            <div className={`bg-content1-900 shadow-xl rounded-2xl text-primary-500 w-96 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}>
                <h1 className="text-2xl font-bold text-center">My Account</h1>
            </div>
        </div>
    );
}
