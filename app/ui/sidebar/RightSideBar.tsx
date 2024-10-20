'use client'
import { Suspense, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@nextui-org/react';
import CreditCart from '../dashboard/CreditCart';
import Footer from '../footer/Footer';
import { Bank, UserInfo } from '@/app/types/types';
import { DEFAULT_PROFILE } from '@/app/constants/CONSTANTS';
import Loading from '../components/common/Loading';
import { useTheme } from 'next-themes';
import Link from 'next/link';

interface RightSideBarProps {
    user: UserInfo | undefined,
    banks: Bank[],
}

export default function RightSideBar({ user, banks }: RightSideBarProps) {
    const theme = useTheme();
    const [usertheme, setUserTheme] = useState<string>('light');

    useEffect(() => {
        if (theme.theme) {
            setUserTheme(theme?.theme);
        }
    }, [theme]);

    return (
        <Suspense fallback={<Loading />}>
            <div className="flex h-[100%]">
                <div className={`overflow-hidden bg-content1-900 shadow-xl rounded-2xl text-primary-500 w-110 space-y-6 absolute inset-y-0 left-0 transform -translate-x-full transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 flex flex-col`}>

                    <div className='h-full flex flex-col overflow-auto'>
                        <div className={`relative h-36 bg-gradient-to-tr
                            ${usertheme === 'light' ? 'from-pink-400 to-indigo-300' : 'from-pink-700 to-black'}
                              flex justify-center items-center`}>
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center">
                                <Avatar src={user?.profileImage ? user.profileImage : DEFAULT_PROFILE} size="lg" />
                            </div>
                        </div>

                        <div className='p-3 py-5 flex justify-center items-center flex-col gap-3'>
                            <h1 className="text-2xl font-bold text-center mt-5">{user?.username}</h1>
                            <h4 className='text-gray-500'>{user?.email}</h4>
                        </div>

                        <div className=' py-7 px-2 '>
                            <CreditCart bank={banks ? banks[0] : undefined} usertheme={usertheme} />

                            <div className='mt-10'>
                                <div className='flex gap-5 justify-between'>

                                    <div className='bg-content1-900 rounded-2xl flex-1'>
                                        <Link href='/cu/transaction/deposit' className='flex p-5 justify-center items-center gap-3 flex-col'>
                                            <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faArrowTrendDown} />
                                            <h3>Deposit</h3>
                                        </Link>
                                    </div>

                                    <div className='bg-content1-900 rounded-2xl flex-1'>
                                        <Link href='/cu/transaction/transfer' className=' flex p-5 justify-center items-center gap-3 flex-col'>
                                            <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faRightLeft} />
                                            <h3>Transfer</h3>
                                        </Link>
                                    </div>
                                    <div className='bg-content1-900 rounded-2xl flex-1'>
                                        <Link href='/cu/transaction/withdrawal' className='flex p-5  justify-center items-center gap-3 flex-col'>
                                            <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faArrowTrendUp} />
                                            <h3>Withdraw</h3>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
