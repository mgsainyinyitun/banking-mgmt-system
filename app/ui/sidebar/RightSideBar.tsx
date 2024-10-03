import { Suspense, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@nextui-org/react';
import CreditCart from '../dashboard/CreditCart';
import Footer from '../footer/Footer';
import { Bank, UserInfo } from '@/app/types/types';
import { DEFAULT_PROFILE } from '@/app/constants/CONST';
import { getBankAccounts } from '@/app/lib/actions/bank-actions';
import Loading from '../components/common/Loading';


interface RightSideBarProps {
    user: UserInfo | undefined;
}

export default async function RightSideBar({ user }: RightSideBarProps) {

    const banks: Bank[] = await getBankAccounts(user?.id) as Bank[];

    return (
        <Suspense fallback={<Loading />}>
            <div className="flex h-[100%]">
                <div className={`overflow-hidden bg-content1-900 shadow-xl rounded-2xl text-primary-500 w-110 space-y-6 absolute inset-y-0 left-0 transform -translate-x-full transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 flex flex-col`}>

                    <div className='h-full flex flex-col overflow-auto'>
                        <div className="relative h-36 bg-gradient-to-tr from-pink-400 to-indigo-300 flex justify-center items-center">
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center">
                                <Avatar src={user?.profileImage ? user.profileImage : DEFAULT_PROFILE} size="lg" />
                            </div>
                        </div>

                        <div className='p-3 py-5 flex justify-center items-center flex-col gap-3'>
                            <h1 className="text-2xl font-bold text-center mt-5">{user?.username}</h1>
                            <h4 className='text-gray-500'>{user?.email}</h4>
                        </div>

                        <div className=' py-7 px-2 '>
                            <CreditCart bank={banks ? banks[0] : undefined} />

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
                        <Footer />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
