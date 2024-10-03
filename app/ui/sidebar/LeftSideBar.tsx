import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { customerSideBar } from './constants';
import Image from 'next/image';
import Logout from './Logout';
import { auth } from '@/auth';
import { DEFAULT_PROFILE, ROUTE_TYPE } from '@/app/constants/CONST';
import { UserInfo } from '@/app/types/types';

interface LeftSideBarProps {
    user: UserInfo | undefined;
}

export default async function LeftSideBar({ user }: LeftSideBarProps) {
    const session = await auth();
    const ty: string | undefined = session?.user?.type;

    return (
        <div className="flex h-[100%]">
            <div className={`bg-content1-900 items-center shadow-xl rounded-2xl text-primary-500 w-64 space-y-6 absolute inset-y-0 left-0 transform -translate-x-full transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}>

                <div className='h-full flex flex-col px-2 py-7 overflow-auto'>
                    <div className='fled flex-col justify-center items-center'>
                        <div className='flex justify-center my-5'>
                            <Avatar src={user?.profileImage ? user.profileImage : DEFAULT_PROFILE} size="lg" />
                        </div>
                        <h1 className="text-2xl font-bold text-center">{user?.username ? user?.username : 'Guest'}</h1>
                    </div>

                    <nav className='mt-10'>
                        {
                            customerSideBar.map(itm => (
                                <Link href={`/${ty ? ROUTE_TYPE[ty] : ''}${itm.link}`} className="flex py-2.5 px-4 rounded-2xl transition duration-200 hover:bg-primary-300 text-lg hover:text-white hover:font-semibold">
                                    <span className='w-8 h-8 bg-primary-400 flex justify-center items-center p-1 rounded-lg'>
                                        <FontAwesomeIcon className='text-white' icon={itm.icon} />
                                    </span>
                                    <span className='ml-3'>{itm.name}</span>
                                </Link>
                            ))
                        }

                        <Logout />
                    </nav>

                    <div className='text-white mt-auto  p-5 bg-content1-900 rounded-2xl flex flex-col'>
                        <div className='flex flex-col justify-center items-center'>
                            <h4 className='text-primary-400 text-lg font-semibold'>ZAI</h4>
                            <h4 className='text-primary-400 text-lg font-semibold'>BANKING</h4>
                        </div>
                        <Image
                            alt='Zai banking logo'
                            src='/icons/zai-logo.png'
                            width={150}
                            height={150}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
