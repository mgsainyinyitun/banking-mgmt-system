'use client'
import { DEFAULT_PROFILE } from '@/app/constants/CONST';
import { uploadProfile } from '@/app/lib/actions/user-actions';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

interface profilePicProps {
    id: string | undefined,
    imageUrl: string | undefined,
}

const ProfilePic = ({ id, imageUrl }: profilePicProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [change, setChange] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file)); // Set preview of the image
        }
        setChange(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const res = await uploadProfile(formData, id, 'cu/dashboard/profile', imageUrl);
        if (res?.success) {
            toast.success(res.message);
        }
        if (!res?.success) {
            res &&
                toast.error(res.message);
        }
        setChange(false);
        setPreview(null);
    };

    return (
        <div className='relative min-h-40 bg-content2-900 p-5 flex justify-center'>
            <Toaster />
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center">
                <div className='w-48 h-48'>
                    <Image
                        src={
                            change ? preview ? preview : DEFAULT_PROFILE :
                                imageUrl ? imageUrl : DEFAULT_PROFILE
                        }
                        alt="Avatar"
                        width={150}
                        height={150}
                        className='bg-white rounded-full border-4 border-white object-cover w-full h-full'
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    {!preview ?
                        (<span className="absolute  bottom-1 -right-0 flex items-center justify-center rounded-2xl bg-primary-300 p-3">
                            <FontAwesomeIcon icon={faPenAlt} className='text-2xl text-white' />
                        </span>) :
                        <Button type='submit' className='absolute  bottom-1 -right-0' color='primary'>Save</Button>
                    }

                    <input
                        type="file" accept="image/*"
                        onChange={handleFileChange}
                        className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${!preview ? 'block' : 'hidden'}`}
                    />
                </form>
            </div>


        </div>
    )
}

export default ProfilePic