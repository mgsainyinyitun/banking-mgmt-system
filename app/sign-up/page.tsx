'use client'
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { Button, Textarea } from '@nextui-org/react';
import { signUp } from '../lib/auth/auth-actions';
import { signupSchema, SignUpSchema } from '../types/form-shema';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../ui/components/form/FormInput';
import FormPassword from '../ui/components/form/FormPassword';
import FormDate from '../ui/components/form/FormDate';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const { theme } = useTheme();
    const [usertheme, setUserTheme] = useState('light');
    const router = useRouter();

    useEffect(() => {
        if (theme) {
            setUserTheme(theme);
        }
    }, [theme])

    const { control, register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<SignUpSchema>({
        resolver: zodResolver(signupSchema),
    });


    const onSubmitForm = async (data: SignUpSchema) => {
        const response = await signUp(data);
        if (response.success) {
            router.push('/sign-in');
        }
        if (response?.errors) {
            toast.error(response?.errors?.message);
        }
    }

    return (
        <div className={`flex h-screen justify-center w-full ${usertheme === 'light' ? 'bg-gradient-radial-circle from-pink-400 to-cyan-300' : 'bbg-gray-500'}`}>
            <Toaster />
            <div className='w-full overflow-auto'>
                <div className='flex justify-center'>
                    <form
                        onSubmit={handleSubmit(onSubmitForm)}
                        className='bg-content1-900 m-5 w-full md:w-[50%] lg:w-[35%] rounded-xl p-4 flex flex-col gap-5'>
                        <h1 className='text-4xl text-blue-500 font-semibold'>Register Account</h1>

                        <div className='flex flex-col justify-center bg-sky-300 p-3 rounded-2xl my-5 text-blue-700'>
                            <h3>Already Have an Account?</h3>
                            <Link href="/sign-in" >
                                Sign In
                            </Link>
                        </div>

                        <FormInput
                            register={register}
                            label='Full Name'
                            type='text'
                            placeholder='Sai Nyi'
                            icon={faUser}
                            name={'username'}
                            error={errors.username?.message}
                        />

                        <FormInput
                            register={register}
                            label='NRC'
                            type='text'
                            placeholder='nrc number'
                            icon={faUser}
                            name={'nrc'}
                            error={errors.nrc?.message}
                        />

                        <FormDate
                            control={control}
                            label='Date of Birth'
                            name={'dob'}
                            error={errors.dob?.message}
                            setValue={(f: any, v: any) => setValue(f, v)}
                        />
                        <div className='flex gap-2'>
                            <FormInput
                                register={register}
                                label='E-mail'
                                type='email'
                                placeholder="you@example.com"
                                icon={faEnvelope}
                                name={'email'}
                                error={errors.email?.message}
                            />
                            <FormInput
                                register={register}
                                label='Phone Number'
                                type='text'
                                placeholder="+95 000000000"
                                icon={faPhone}
                                name={'phone'}
                                error={errors.phone?.message}
                            />
                        </div>

                        <div className='flex gap-2'>
                            <FormInput
                                register={register}
                                label='City'
                                type='text'
                                placeholder="Yangon"
                                name={'city'}
                                error={errors.city?.message}
                            />
                            <FormInput
                                register={register}
                                label='State'
                                type='text'
                                placeholder="Shan state"
                                name={'state'}
                                error={errors.state?.message}
                            />
                        </div>

                        <Textarea
                            {...register('address')}
                            isInvalid={errors.address?.message ? true : false}
                            size='lg'
                            radius='sm'
                            label="Address"
                            placeholder="Enter your Address"
                            labelPlacement="outside"
                            name={'address'}
                            errorMessage={errors.address?.message}
                        />

                        <FormPassword
                            register={register}
                            label='Password'
                            placeholder='Enter Password'
                            name={'password'}
                            error={errors.password?.message}
                        />
                        <FormPassword
                            register={register}
                            label='Confirm Password'
                            placeholder='Enter Confirm Password'
                            name={'confirmPassword'}
                            error={errors.confirmPassword?.message}
                        />

                        <Button radius='sm' color='primary' size="lg" type='submit' isLoading={isSubmitting}>
                            {isSubmitting ? 'Loading...' : 'SIGN UP'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn