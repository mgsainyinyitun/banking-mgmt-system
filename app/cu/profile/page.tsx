import { getBankAccounts } from '@/app/lib/actions/bank-actions';
import { getUser } from '@/app/lib/actions/user-actions';
import { Bank, UserInfo } from '@/app/types/types';
import Loading from '@/app/ui/components/common/Loading';
import BankInfo from '@/app/ui/profile/BankInfo';
import ProfileInfo from '@/app/ui/profile/ProfileInfo';
import ProfilePic from '@/app/ui/profile/ProfilePic';
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'

const Profile = async () => {

    const session = await auth();

    const [user, bank] = await Promise.all([
        getUser(session?.user?.id),
        getBankAccounts(session?.user?.id),
    ]);

    if ((bank as Bank[]).length === 0) redirect('/cu');

    return (
        <Suspense fallback={<Loading />}>
            <section className='h-full m-5 rounded-2xl overflow-hidden'>
                <div className='overflow-auto flex flex-col gap-3 h-full'>
                    <ProfilePic id={session?.user?.id} imageUrl={user?.profileImage} />
                    <div className='flex justify-center items-center'>
                        <h1 className='text-4xl text-pretty font-bold text-gray-500 mt-16'>{session?.user.username}</h1>
                    </div>
                    <BankInfo bank={bank as Bank[]} />
                    <ProfileInfo user={user as UserInfo} />
                </div>
            </section>
        </Suspense>
    )
}

export default Profile
