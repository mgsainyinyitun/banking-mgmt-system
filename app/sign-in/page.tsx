'use client'
import React, { useEffect, useState } from 'react'
import { authenticate } from '../lib/auth/auth-actions';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Button } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema, signInSchema } from '../types/form-shema';
import { useForm } from 'react-hook-form';
import FormInput from '../ui/components/form/FormInput';
import FormPassword from '../ui/components/form/FormPassword';
import toast, { Toaster } from 'react-hot-toast';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

const SignIn = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmitForm = async (data: SignInSchema) => {
        const response = await authenticate(data);
        if (response?.errors) {
            toast.error(response?.errors?.message);
        }
    }

    const { theme } = useTheme();
    const [usertheme, setUserTheme] = useState('light');

    useEffect(() => {
        if (theme) {
            setUserTheme(theme);
        }
    }, [theme])

    return (
        <div className={`flex h-screen justify-center w-full ${usertheme === 'light' ? 'bg-gradient-radial-circle from-pink-400 to-cyan-300' : 'bbg-gray-500'}`}>

            <Toaster />
            <div className='w-full overflow-auto'>
                <div className='flex justify-center items-center'>
                    <form
                        onSubmit={handleSubmit(onSubmitForm)}
                        className='bg-white m-5 w-full md:w-[50%] lg:w-[35%] rounded-xl p-4 flex flex-col gap-5'>
                        <div className='flex gap-3 items-center justify-center'>
                            <Image src={"/icons/zai-logo.png"} alt='zai-logo' width={100} height={100} />
                            <h1 className='text-6xl font-bold text-primary-400'>ZAI</h1>
                        </div>
                        <div>
                            <h1 className='text-2xl mt-3 text-blue-500 font-semibold'>Sign In</h1>
                            <p className='text-gray-500 mb-3'>Please Enter Your Details</p>
                        </div>
                        <FormInput
                            register={register}
                            label='Full Name'
                            type='text'
                            placeholder='Sai Nyi'
                            icon={faEnvelope}
                            name={'email'}
                            error={errors.email?.message}
                        />

                        <FormPassword
                            register={register}
                            label='Password'
                            placeholder='Enter Password'
                            name={'password'}
                            error={errors.password?.message}
                        />

                        <Button className='mt-3' radius='sm' color='primary' size="lg" type='submit' isLoading={isSubmitting}>
                            {isSubmitting ? 'Loading...' : 'Sign In'}
                        </Button>

                        <p className='text-center text-gray-500'>Don&apos;t have an account? <Link href="/sign-up" className='text-blue-500'>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;