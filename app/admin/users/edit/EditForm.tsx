'use client'
import React, { useEffect, useState } from 'react';
import { adminUserUpdateSchema, AdminUserUpdateSchema } from "@/app/types/form-shema";
import { useForm, SubmitHandler, Controller, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/app/ui/components/form/FormInput";
import { updateUserAdmin } from "@/app/lib/actions/admin-actions";
import toast, { Toaster } from "react-hot-toast";
import { Button, CalendarDate, DateInput, Select, SelectItem } from "@nextui-org/react";
import { UserDetail } from '@/app/types/types';
import ResponsiveFormWraper from '@/app/ui/components/common/ResponsiveFormWraper';
import { ACCOUNT_TYPE, AccountStatus } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import FormDate from '@/app/ui/components/form/FormDate';
import { parseDate } from "@internationalized/date";


const accTypes = [
    {
        name: 'ADMIN',
        value: ACCOUNT_TYPE.ADMIN
    },
    {
        name: 'TELLER',
        value: ACCOUNT_TYPE.TELLER
    },
    {
        name: 'CUSTOMER',
        value: ACCOUNT_TYPE.CUSTOMER
    },
]

const accStatus = [
    {
        name: 'ACTIVE',
        value: AccountStatus.ACTIVE
    },
    {
        name: 'SUSPENDED',
        value: AccountStatus.SUSPENDED
    },
]

interface EditFormProps {
    user: UserDetail
}

const EditForm: React.FC<EditFormProps> = ({ user }) => {
    const { control, setValue, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdminUserUpdateSchema>({
        resolver: zodResolver(adminUserUpdateSchema),
    });

    const [change, setChange] = useState(false);

    const onSubmit: SubmitHandler<AdminUserUpdateSchema> = async (data) => {
        console.log(data)
        const response = await updateUserAdmin(data);

        if (response.success) {
            toast.success('User updated successfully!');
        } else {
            toast.error(response.message || 'Failed to update user.');
        }
    };


    useEffect(() => {
        if (user.dob) {
            setValue('dob', user.dob);
        }
    }, [user.dob]);


    const handleChange = (date: CalendarDate) => {
        const jsDate = new Date(date.year, date.month - 1, date.day);
        if (jsDate instanceof Date) {
            setValue('dob', jsDate);
            setChange(true);
        }
    }

    return (
        <div className='flex flex-col overflow-auto mb-5'>
            <Toaster />
            <ResponsiveFormWraper onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" value={user.id} {...register('id')} />
                <FormInput
                    label="Username"
                    type="text"
                    placeholder="Enter username"
                    register={register}
                    error={errors.username?.message}
                    value={user.username}
                    name={'username'}
                    onChange={() => setChange(true)}
                />
                <FormInput
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    register={register}
                    error={errors.email?.message}
                    value={user.email}
                    name={'email'}
                    onChange={() => setChange(true)}
                />
                <FormInput
                    label="Phone"
                    type="text"
                    placeholder="Enter phone number"
                    register={register}
                    error={errors.phone?.message}
                    value={user.phone}
                    name={'phone'}
                    onChange={() => setChange(true)}
                />
                <FormInput
                    label="City"
                    type="text"
                    placeholder="Enter city"
                    register={register}
                    error={errors.city?.message}
                    value={user.city}
                    name={'city'}
                    onChange={() => setChange(true)}
                />
                <FormInput
                    label="State"
                    type="text"
                    placeholder="Enter state"
                    register={register}
                    error={errors.state?.message}
                    value={user.state}
                    name={'state'}
                    onChange={() => setChange(true)}
                />
                <FormInput
                    label="Address"
                    type="text"
                    placeholder="Enter address"
                    register={register}
                    error={errors.address?.message}
                    value={user.address}
                    name={'address'}
                    onChange={() => setChange(true)}
                />
                <FormInput
                    label="NRC"
                    type="text"
                    placeholder="Enter NRC"
                    register={register}
                    error={errors.nrc?.message}
                    value={user.nrc}
                    name={'nrc'}
                    onChange={() => setChange(true)}
                />
                <Controller
                    name="dob"
                    control={control}
                    render={({ field }) => (
                        <DateInput
                            isInvalid={errors.dob?.message ? true : false}
                            labelPlacement="outside"
                            label="Date of Birth"
                            radius="sm"
                            size="lg"
                            isRequired
                            errorMessage={errors.dob?.message}
                            onBlur={field.onBlur}
                            onChange={(calendarDate) => handleChange(calendarDate)}
                            defaultValue={user.dob ? parseDate(user.dob.toISOString().split('T')[0]) : undefined}
                        // value={user.dob ? parseDate(user.dob.toISOString().split('T')[0]) : undefined}
                        />
                    )}
                />

                <Select
                    label="Account Type"
                    labelPlacement='outside'
                    isRequired={true}
                    radius='sm'
                    size='lg'
                    defaultSelectedKeys={user.type ? [user.type] : []}
                    placeholder='Account Type'
                    {...register('type')}
                    onChange={() => setChange(true)}
                    startContent={<FontAwesomeIcon icon={faUserCircle} className='text-sky-400' />}
                >
                    {accTypes.map((acc) => (
                        <SelectItem key={acc.value}>
                            {acc.name}
                        </SelectItem>
                    ))}
                </Select>

                {user.type === ACCOUNT_TYPE.CUSTOMER && (
                    <>
                        <Select
                            label="Account Status"
                            labelPlacement='outside'
                            isRequired={true}
                            radius='sm'
                            size='lg'
                            placeholder='Status'
                            {...register('status')}
                            onChange={() => setChange(true)}
                            defaultSelectedKeys={user.bankAccounts[0]?.accountStatus ? [user.bankAccounts[0]?.accountStatus] : []}
                            startContent={<FontAwesomeIcon icon={faUserCircle} className='text-sky-400' />}
                        >
                            {accStatus.map((acc) => (
                                <SelectItem key={acc.value}>
                                    {acc.name}
                                </SelectItem>
                            ))}
                        </Select>

                        <FormInput
                            label="Bank Account Number"
                            type="text"
                            placeholder="Enter bank account number"
                            register={register}
                            error={errors.bankAccountNumber?.message}
                            value={user.bankAccounts[0]?.accountNumber || ''}
                            name={'bankAccountNumber'}
                            onChange={() => setChange(true)}
                        />
                    </>
                )}


                <Button radius='sm' color='primary' size="lg" type='submit' isLoading={isSubmitting} isDisabled={!change}>
                    {isSubmitting ? 'Loading...' : 'Update User'}
                </Button>
            </ResponsiveFormWraper>
        </div>
    );
};

export default EditForm;

