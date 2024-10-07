'use client'
import { changePassword } from '@/app/lib/actions/user-actions';
import { PasswordChangeSchema, passwordChangeSchema } from '@/app/types/form-shema';
import ResponsiveFormWraper from '@/app/ui/components/common/ResponsiveFormWraper'
import FormPassword from '@/app/ui/components/form/FormPassword'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider } from '@nextui-org/react';
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

interface passwordChangeProps {
    id: string | undefined,
}

const PasswordChangeForm = ({ id }: passwordChangeProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PasswordChangeSchema>({
        resolver: zodResolver(passwordChangeSchema),
    });

    const onSubmitForm = async (data: PasswordChangeSchema) => {
        console.log(data);
        const res = await changePassword(data);

        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }
    return (
        <Fragment>
            <Toaster />
            <ResponsiveFormWraper onSubmit={handleSubmit(onSubmitForm)}>
                <input type='hidden' {...register('id')} value={id} />
                <FormPassword
                    register={register}
                    label='Please Your Old Password'
                    placeholder='Enter Old Password'
                    name={'oldpassword'}
                    error={errors.oldpassword?.message}
                />
                <Divider className="my-4" />
                <FormPassword
                    register={register}
                    label='Plese Enter New Password'
                    placeholder='Enter Password'
                    name={'password'}
                    error={errors.password?.message}
                />

                <FormPassword
                    register={register}
                    label='Please Enter Confirm Password'
                    placeholder='Confirm Password'
                    name={'confirmPassword'}
                    error={errors.confirmPassword?.message}
                />
                <Button radius='sm' color='primary' size="lg" type='submit' isLoading={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Change'}
                </Button>
            </ResponsiveFormWraper>
        </Fragment>
    )
}

export default PasswordChangeForm