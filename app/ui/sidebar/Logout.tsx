import { signOut } from '@/auth'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Logout = () => {
    return (
        <form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/sign-in' });
            }}
            className="text-red-500 flex py-2.5 px-4 rounded-2xl transition duration-200 hover:bg-primary-300 text-lg hover:text-white hover:font-semibold"
        >
            <button className='flex w-full' type='submit'>
                <span className='w-8 h-8 bg-red-400 flex justify-center items-center p-1 rounded-lg'>
                    <FontAwesomeIcon className='text-white' icon={faArrowRightFromBracket} />
                </span>
                <span className='ml-3'>Logout</span>
            </button>
        </form >
    )
}

export default Logout