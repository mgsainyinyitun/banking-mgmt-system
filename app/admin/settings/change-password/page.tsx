import React from 'react'
import PasswordChangeForm from '../../../ui/components/form/PasswordChangeForm';
import { auth } from '@/auth';

const ChangePassword = async () => {

    const session = await auth();
    return (
        <div className='w-full h-full'>
            <PasswordChangeForm id={session?.user?.id} />
        </div>
    )
}

export default ChangePassword