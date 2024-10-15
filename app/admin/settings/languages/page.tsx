'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Image from 'next/image'
import React, { useState } from 'react'

const LanguageSetting = () => {
    const [language, setLanguage] = useState<string>('english');
    setLanguage('english');
    return (
        <div className='w-full h-full p-3 flex justify-center '>
            <div className='bg-content1-900 rounded-2xl flex flex-col items-center md:w-[80%] lg:w-[70%] p-3'>
                <Image src={"/icons/zai-logo.png"} alt='zai-logo' width={100} height={100} className='mt-10' />
                <h1 className='text-xl text-gray-500 mt-10'>Language Setting</h1>
                <p className='text-gray-300 my-5'>Choose language</p>
                <div className='w-full md:w-[50%]'>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                fullWidth
                            >
                                {language}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="language Actions" className='w-full'>
                            <DropdownItem key="english">English</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default LanguageSetting