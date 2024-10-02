import { faBell, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@nextui-org/react'
import React from 'react'

const AppBar = () => {
    return (
        <div className='bg-content1-900 w-full min-h-14 p-3 flex justify-between items-center gap-5'>

            <div className='flex flex-col gap-2 flex-1'>
                <h1 className='text-3xl text-primary-400 font-semibold'>Hi ,  Sai Nyi 👋</h1>
                <p className='text-gray-400'>Welcome to banking management system</p>
            </div>

            <div className='flex-1'>
                <Input startContent={<FontAwesomeIcon icon={faSearch} />} size='lg' type="text" placeholder='search ...' />
            </div>

            <div className='flex gap-5'>
                <FontAwesomeIcon className='text-2xl text-primary-400' icon={faBell} />
                <FontAwesomeIcon className='text-2xl text-primary-400'icon={faEnvelope} />
            </div>
        </div>
    )
}

export default AppBar