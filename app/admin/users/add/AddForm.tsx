'use client'
import { faEnvelope, faMoneyCheck, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { Button, DatePicker, DateValue, Select, SelectItem, Textarea } from '@nextui-org/react';
import { addUser } from '../../../lib/actions/admin-actions';
import { adminUserCreateSchema, AdminUserCreateSchema } from '../../../types/form-shema';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../../ui/components/form/FormInput';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BANK_ACC_TYPE } from '@/app/constants/CONSTANTS';
import { ACCOUNT_TYPE } from '@prisma/client';

const acctypes = [
    {
        name: 'Saving Account',
        value: BANK_ACC_TYPE.SAVINGS
    },
    {
        name: 'Checking Account',
        value: BANK_ACC_TYPE.CHECKING
    }
]


const userType = [
    {
        name: 'ADMIN',
        value: ACCOUNT_TYPE.ADMIN
    },
    {
        name: 'CUSTOMER',
        value: ACCOUNT_TYPE.CUSTOMER
    },
    {
        name: 'TELL|ER',
        value: ACCOUNT_TYPE.TELLER
    }
]

const AddForm = () => {
    const router = useRouter();

    const { watch, control, register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<AdminUserCreateSchema>({
        resolver: zodResolver(adminUserCreateSchema),
    });

    const onSubmitForm = async (data: AdminUserCreateSchema) => {
        console.log(data);
        const response = await addUser(data);
        if (response.success) {
            router.push('/admin/users');
        }
        if (response?.errors) {
            toast.error(response?.errors?.message);
        }
    }

    return (
        <div className='flex flex-col overflow-auto mb-5'>
            <Toaster />
            <div className='w-full overflow-auto'>
                <div className='flex justify-center'>
                    <form
                        onSubmit={handleSubmit(onSubmitForm)}
                        className='bg-white m-5 w-full md:w-[50%] lg:w-[40%] rounded-xl p-4 flex flex-col gap-5'>

                        <div className='flex flex-col gap-3'>
                            <h1 className='text-3xl text-blue-500 font-semibold'>Add New User</h1>
                            <p className='text-gray-500 mb-3'>Please Enter User Details</p>
                        </div>

                        <FormInput
                            register={register}
                            label='Full Name'
                            type='text'
                            placeholder='Your Full Name'
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

                        <Select
                            label="Select User Type"
                            className=""
                            labelPlacement='outside'
                            isRequired={true}
                            radius='sm'
                            size='lg'
                            placeholder='User type'
                            {...register('type')}
                            startContent={<FontAwesomeIcon icon={faMoneyCheck} className='text-sky-400' />}
                        >
                            {userType.map((itm) => (
                                <SelectItem key={itm.value}>
                                    {itm.name}
                                </SelectItem>
                            ))}
                        </Select>

                        <DatePicker
                            {...register('dob')}
                            label='Date of Birth'
                            radius='sm'
                            fullWidth
                            labelPlacement="outside"
                            onChange={(v: DateValue) => {
                                const jsDate = new Date(v.year, v.month - 1, v.day);
                                setValue('dob', jsDate);
                            }}
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

                        {watch('type') === ACCOUNT_TYPE.CUSTOMER && (
                            <>
                                <FormInput
                                    register={register}
                                    label='Bank User Name'
                                    type='text'
                                    placeholder='Bank User Name'
                                    name={'bankUserName'}
                                    error={errors.bankUserName?.message}
                                />

                                <Select
                                    label="Select Bank Account Type"
                                    className=""
                                    labelPlacement='outside'
                                    isRequired={true}
                                    radius='sm'
                                    size='lg'
                                    placeholder='account type'
                                    {...register('accountType')}
                                    startContent={<FontAwesomeIcon icon={faMoneyCheck} className='text-sky-400' />}
                                >
                                    {acctypes.map((itm) => (
                                        <SelectItem key={itm.value}>
                                            {itm.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </>
                        )}

                        <Button radius='sm' color='primary' size="lg" type='submit' isLoading={isSubmitting}>
                            {isSubmitting ? 'Loading...' : 'ADD USER'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddForm;
