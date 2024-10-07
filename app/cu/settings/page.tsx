'use client'
import { ThemeSwitcher } from '@/app/ui/components/ThemeSwitcher'
import { faChevronRight, faCircleHalfStroke, faKey, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Listbox, ListboxItem } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

const Settings = () => {

    return (
        <div className='flex w-full h-full justify-center items-center p-3'>
            <div className='h-full bg-content1-900 rounded-2xl flex flex-col items-center md:w-[80%] lg:w-[70%] p-3'>
                <Image src={"/icons/zai-logo.png"} alt='zai-logo' width={100} height={100} className='mt-10' />
                <div className="w-full mt-10 mb-10 max-w-[360px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                    <Listbox variant="faded" aria-label="Listbox menu with icons" className='w-full border-none'>
                        <ListboxItem
                            variant='bordered'
                            key="new"
                            className='p-3 mb-3 bg-primary-400'
                            startContent={<FontAwesomeIcon icon={faCircleHalfStroke} className='text-white text-2xl' />}
                            endContent={<ThemeSwitcher />}
                        >
                            <p className='text-white text-xl'>Dark Mode</p>
                        </ListboxItem>
                        <ListboxItem
                            variant='bordered'
                            className='p-3 mb-3 bg-primary-400'
                            key="copy"
                            startContent={<FontAwesomeIcon icon={faKey} className='text-white text-2xl' />}
                            endContent={<FontAwesomeIcon icon={faChevronRight} className='text-white text-2xl' />}
                            href='settings/change-password'
                        >
                            <p className='text-white text-xl'>
                                Change Password
                            </p>

                        </ListboxItem>

                        <ListboxItem
                            variant='bordered'
                            className='p-3 bg-primary-400'
                            key="edit"
                            href='settings/languages'
                            startContent={<FontAwesomeIcon icon={faLanguage} className='text-white text-2xl' />}
                            endContent={<FontAwesomeIcon icon={faChevronRight} className='text-white text-2xl' />}
                        >
                            <p className='text-white text-xl'>Language</p>
                        </ListboxItem>
                    </Listbox>
                </div>
            </div>
        </div>
    )
}

export default Settings