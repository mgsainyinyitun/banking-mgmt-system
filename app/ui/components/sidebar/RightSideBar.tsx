'use client'
import { useState } from 'react';
import CreditCart from '../../dashboard/CreditCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@nextui-org/react';

export default function RightSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-[100%]">
            <div className={`overflow-hidden bg-content1-900 shadow-xl rounded-2xl text-primary-500 w-110 space-y-6 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0`}>

                <div className="relative h-36 bg-gradient-to-tr from-pink-400 to-indigo-300 flex justify-center items-center">
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center">
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" />
                    </div>
                </div>

                <div className='p-3 py-5 flex justify-center items-center flex-col gap-3'>
                    <h1 className="text-2xl font-bold text-center">Sai Nyi Nyi Tun</h1>
                    <h4 className='text-gray-500'>mgsainyinyitun.tumdy@gmail.com</h4>
                </div>

                <div className=' py-7 px-2 '>
                    <CreditCart />

                    <div className='mt-10'>
                        <div className='flex gap-5 justify-between'>
                            <div className='bg-content1-900 rounded-2xl flex p-5 flex-1 justify-center items-center gap-3'>
                                <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faArrowTrendDown} />
                                <h3>Cash In</h3>
                            </div>
                            <div className='bg-content1-900 rounded-2xl flex p-5 flex-1 justify-center items-center gap-3'>
                                <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faRightLeft} />
                                <h3>Transfer</h3>
                            </div>
                            <div className='bg-content1-900 rounded-2xl flex p-5 flex-1 justify-center items-center gap-3'>
                                <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faArrowTrendUp} />
                                <h3>Cash Out</h3>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
