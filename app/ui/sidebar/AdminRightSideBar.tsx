'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserEdit, faUserTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Avatar, Input } from '@nextui-org/react';
import { DEFAULT_PROFILE } from '@/app/constants/CONSTANTS';
import Loading from '../components/common/Loading';
import Footer from '../footer/Footer';

interface AdminRightSideBarProps {
    user: {
        profileImage?: string;
        username: string;
        email: string;
    };
}

export default function AdminRightSideBar({ user }: AdminRightSideBarProps) {
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
                <div className={`overflow-hidden bg-content1-900 shadow-xl rounded-2xl text-primary-500 w-96 space-y-6 absolute inset-y-0 right-0 transform translate-x-full transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 flex flex-col`}>

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
                        <div className='p-3 py-5 flex justify-center items-center gap-3'>
                            <Input
                                isClearable
                                color="primary"
                                size="lg"
                                placeholder="Search by username or account ID"
                            />
                            <button className="px-4 py-2 bg-primary-400 text-white rounded-lg hover:bg-primary-600">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>

                        <div className=' py-7 px-2 '>
                            <div className='mt-10'>
                                <div className='flex gap-5 justify-between'>
                                    <div className='bg-content1-900 rounded-2xl flex-1'>
                                        <Link href='/admin/user/add' className='flex p-5 justify-center items-center gap-3 flex-col'>
                                            <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faUserPlus} />
                                            <h3>Add User</h3>
                                        </Link>
                                    </div>

                                    <div className='bg-content1-900 rounded-2xl flex-1'>
                                        <Link href='/admin/user/edit' className=' flex p-5 justify-center items-center gap-3 flex-col'>
                                            <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faUserEdit} />
                                            <h3>Edit User</h3>
                                        </Link>
                                    </div>
                                    <div className='bg-content1-900 rounded-2xl flex-1'>
                                        <Link href='/admin/user/delete' className='flex p-5  justify-center items-center gap-3 flex-col'>
                                            <FontAwesomeIcon className='text-primary-400 text-3xl' icon={faUserTimes} />
                                            <h3>Delete User</h3>
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
