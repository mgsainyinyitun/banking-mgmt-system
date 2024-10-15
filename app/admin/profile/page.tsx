import React from 'react';
import { auth } from '@/auth';
import { getUser } from '@/app/lib/actions/user-actions';
import ProfileInfo from '@/app/ui/profile/ProfileInfo';
import ProfilePic from '@/app/ui/profile/ProfilePic';
import { UserInfo } from '@/app/types/types';

const AdminProfile = async () => {
    const session = await auth();
    const user = await getUser(session?.user?.id) as UserInfo;

    return (
        <section className='h-full m-5 rounded-2xl overflow-hidden'>
            <div className='overflow-auto flex flex-col gap-3 h-full'>
                <ProfilePic id={session?.user?.id} imageUrl={user?.profileImage} />
                <div className='flex justify-center items-center'>
                    <h1 className='text-4xl font-bold text-gray-500 mt-16'>{session?.user.username}</h1>
                </div>
                <ProfileInfo user={user} />
            </div>
        </section>
    );
}

export default AdminProfile;