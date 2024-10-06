'use client'
import { withdraw } from '@/app/lib/actions/transaction-actions';
import { formatNumberToGroupsOfFour } from '@/app/lib/utils';
import { withdrawSchema, WithdrawSchema } from '@/app/types/form-shema';
import { Bank, Transaction } from '@/app/types/types';
import FormStepper from '@/app/ui/components/common/FormStepper';
import ResponsiveFormWraper from '@/app/ui/components/common/ResponsiveFormWraper'
import FormInput from '@/app/ui/components/form/FormInput';
import { faArrowLeft, faBank, faHome, faMoneyBill, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
const trType = [
    {
        name: 'ZAI BANK',
        value: 'zai_bank'
    },
]

interface withdrawlFormProps {
    bank: Bank | undefined
}

const WithdrawalForm = ({ bank }: withdrawlFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm<WithdrawSchema>({
        resolver: zodResolver(withdrawSchema),
    });

    const [state, setState] = useState<number>(1);
    const [tran, setTran] = useState<Transaction | undefined>();

    const onBackClick = () => {
        setState(state - 1);
    }
    const onSubmitForm = async (data: WithdrawSchema) => {
        switch (state) {
            case 1: { console.log(data); setState(2); break }
            case 2: {
                const res = await withdraw(data);
                if (res.success) {
                    toast.success('Successfully withdraw from your Account!')
                    setTran(res.transaction);
                    setState(3);
                } else {
                    toast.error('Something went Wrong! Please Try again later');
                };
                break
            }
            default: return;
        }
    }

    return (
        <Fragment>
            <FormStepper active={state - 1} type='T' />
            {state === 1 && (
                <Fragment>
                    <ResponsiveFormWraper onSubmit={handleSubmit(onSubmitForm)}>
                        <input type='hidden' value={bank?.id} {...register('id')} />
                        <Select
                            label="Withdraw From"
                            labelPlacement='outside'
                            isRequired={true}
                            radius='sm'
                            size='lg'
                            placeholder='Withdraw'
                            {...register('type')}
                            startContent={<FontAwesomeIcon icon={faStarHalfStroke} className='text-sky-400' />}
                        >
                            {trType.map((itm) => (
                                <SelectItem key={itm.value}>
                                    {itm.name}
                                </SelectItem>
                            ))}
                        </Select>
                        <FormInput
                            register={register}
                            label='Account Number'
                            type='text'
                            icon={faBank}
                            name={'account_id'}
                            value={bank?.accountNumber}
                            error={errors.account_id?.message}
                        />
                        <FormInput
                            register={register}
                            label='Amount'
                            type='number'
                            icon={faMoneyBill}
                            name={'amount'}
                            error={errors.amount?.message}
                        />
                        <input type='hidden' value={bank?.balance} {...register('available')} />
                        <h3 className='text-gray-400'>Available Balance : {bank?.balance} mmk</h3>

                        <Button radius='sm' color='primary' size="lg" type='submit' isLoading={isSubmitting}>
                            {isSubmitting ? 'Loading...' : 'NEXT'}
                        </Button>
                    </ResponsiveFormWraper>
                </Fragment>
            )}

            {
                state === 2 && (
                    <Fragment>

                        <ResponsiveFormWraper onSubmit={handleSubmit(onSubmitForm)}>
                            <div className='flex justify-center items-center w-full'>
                                <h3 className='text-primary-400 text-2xl text-center'>Please Confirm Your Withdrawl Information</h3>
                            </div>

                            <Input
                                value={getValues('type')}
                                isReadOnly
                                radius='sm'
                                size='lg'
                                label='Withdraw From'
                                labelPlacement="outside"
                                isDisabled
                            />

                            <Input
                                value={formatNumberToGroupsOfFour(getValues('account_id'))}
                                isReadOnly
                                radius='sm'
                                size='lg'
                                label='Your Account ID'
                                labelPlacement="outside"
                                isDisabled
                            />

                            <Input
                                value={getValues('amount').toString()}
                                isReadOnly
                                radius='sm'
                                size='lg'
                                label='Withdraw Amount'
                                labelPlacement="outside"
                                isDisabled
                            />


                            <div className='flex gap-5 justify-between'>
                                <Button radius='sm' color='default' size="lg"
                                    onClick={onBackClick}
                                    startContent={<FontAwesomeIcon icon={faArrowLeft} className='text-primary-400' />} >
                                    BACK
                                </Button>
                                <Button radius='sm' color='primary' size="lg" type='submit' isLoading={isSubmitting}>
                                    {isSubmitting ? 'Loading...' : 'CONFIRM'}
                                </Button>

                            </div>
                        </ResponsiveFormWraper>
                    </Fragment>
                )
            }
            {
                state === 3 && (
                    <Fragment>
                        <ResponsiveFormWraper onSubmit={handleSubmit(onSubmitForm)}>
                            <div className='justify-center items-center w-full flex flex-col bg-green-200 p-3 rounded-2xl text-white'>
                                <h3 className='text-2xl text-center text-primary-400'>Successfully withdraw from your Account</h3>
                                <h4 className='mt-3 text-center text-gray-500'>Please wait Banking Admin to Approve Your Request</h4>
                            </div>

                            <Input
                                value={formatNumberToGroupsOfFour(tran?.transaction_id)}
                                isReadOnly
                                radius='sm'
                                size='lg'
                                label='Transaction ID'
                                labelPlacement="outside"
                                isDisabled
                            />

                            <Input
                                value={formatNumberToGroupsOfFour(getValues('account_id'))}
                                isReadOnly
                                radius='sm'
                                size='lg'
                                label='Your Account ID'
                                labelPlacement="outside"
                                isDisabled
                            />

                            <Input
                                value={getValues('amount').toString()}
                                isReadOnly
                                radius='sm'
                                size='lg'
                                label='Deposit Amount'
                                labelPlacement="outside"
                                isDisabled
                            />

                            <Input
                                value={tran?.transactionStatus}
                                isReadOnly
                                radius='sm'
                                size='lg'
                                label='Status'
                                labelPlacement="outside"
                                isDisabled
                            />


                            <div className='flex gap-5 justify-center'>
                                <Link href='/cu/dashboard' className='rounded-lg bg-primary-400 p-3 text-center text-white flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faHome} className='text-white mr-3' />
                                    DASHBOARD
                                </Link>
                            </div>
                        </ResponsiveFormWraper>
                    </Fragment>
                )
            }


        </Fragment>
    )
}

export default WithdrawalForm