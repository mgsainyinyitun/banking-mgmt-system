import { UserInfo } from '@/app/types/types'
import { faBell, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@nextui-org/react'
import React from 'react'

interface appBarProps {
    user: UserInfo | undefined
}

const AppBar = ({ user }: appBarProps) => {
    return (
        <div className='bg-content1-900 w-full min-h-14 p-3 flex flex-col md:flex-row justify-between items-center gap-5'>
            <div className='flex flex-col gap-2 w-full md:w-auto'>
                <h1 className='text-2xl md:text-3xl text-primary-400 font-semibold'>Hi, {user?.username} 👋</h1>
                <p className='hidden md:block text-sm md:text-base text-gray-400'>Welcome to banking management system</p>
            </div>

            <div className='hidden md:block w-1/3 mt-4 md:mt-0'>
                <Input 
                    startContent={<FontAwesomeIcon icon={faSearch} />} 
                    size='lg' 
                    type="text" 
                    placeholder='search ...' 
                    className='w-full'
                />
            </div>

            <div className='flex gap-5 mt-4 md:mt-0'>
                <FontAwesomeIcon className='text-xl md:text-2xl text-primary-400' icon={faBell} />
                <FontAwesomeIcon className='text-xl md:text-2xl text-primary-400' icon={faEnvelope} />
            </div>
        </div>
    )
}

export default AppBar