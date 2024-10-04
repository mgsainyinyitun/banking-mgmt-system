import React from 'react'
import { Toaster } from 'react-hot-toast';

interface responsiveWraperProps {
    children: React.ReactNode;
    onSubmit: () => void,
}
const ResponsiveFormWraper = ({ children, onSubmit }: responsiveWraperProps) => {
    return (
        <div className='w-full h-full flex justify-center'>
            <Toaster/>
            <div className='w-full md:w-[50%] lg:w-[45%]'>
                <form
                    onSubmit={onSubmit}
                    className='bg-content1-900 m-5 rounded-xl p-4 flex flex-col gap-5'>
                    {children}
                </form>
            </div>
        </div>
    )
}

export default ResponsiveFormWraper