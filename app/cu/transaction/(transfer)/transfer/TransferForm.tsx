'use client'
import { getToAccountInfo } from '@/app/lib/actions/bank-actions';
import { transfer } from '@/app/lib/actions/transaction-actions';
import { formatNumberToGroupsOfFour } from '@/app/lib/utils';
import { transferSchema, TransferSchema } from '@/app/types/form-shema';
import { Bank, Transaction } from '@/app/types/types';
import FormStepper from '@/app/ui/components/common/FormStepper';
import ResponsiveFormWraper from '@/app/ui/components/common/ResponsiveFormWraper'
import FormInput from '@/app/ui/components/form/FormInput';
import { faArrowLeft, faBank, faHome, faMoneyBill, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

interface transferFormProps {
    bank: Bank | undefined
}

const TransferForm = ({ bank }: transferFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm<TransferSchema>({
        resolver: zodResolver(transferSchema),
    });

    const [state, setState] = useState<number>(1);
    const [tran, setTran] = useState<Transaction | undefined>();
    const [toAcc, setToAcc] = useState<Bank>();

    const onBackClick = () => {
        setState(state - 1);
    }
    const onSubmitForm = async (data: TransferSchema) => {
        switch (state) {
            case 1: {
                const res = await getToAccountInfo(data.to_account_id);
                if (res.success) {
                    setToAcc(res.toAccount ? res.toAccount : undefined);
                    setState(2);
                } else {
                    toast.error(res.error ? res.error : 'Something went Wrong! Please Try again later');
                }
                break;
            }
            case 2: {
                const res = await transfer(data);
                if (res.success) {
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
            <Toaster />
            <FormStepper active={state - 1} type='T' />
            {state === 1 && (
                <Fragment>
                    <ResponsiveFormWraper onSubmit={handleSubmit(onSubmitForm)}>
                        <input type='hidden' value={bank?.id} {...register('id')} />
                        <FormInput
                            register={register}
                            label='Transfer Account Number'
                            type='text'
                            icon={faMoneyBillTransfer}
                            name={'to_account_id'}
                            error={errors.to_account_id?.message}
                        />
                        <FormInput
                            register={register}
                            label='Your Account Number'
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
                                <h3 className='text-primary-400 text-2xl text-center'>Please Confirm Your Transfer Information</h3>
                            </div>

                            <Input
                                value={(toAcc?.account_name)}
                                isReadOnly
                                radius='sm'
                                size='lg'
                                label='Trasfer To Account Name'
                                labelPlacement="outside"
                                isDisabled
                            />

                            <Input
                                value={formatNumberToGroupsOfFour(getValues('to_account_id'))}
                                isReadOnly
                                radius='sm'
                                size='lg'
                                label='Transfer To Account ID'
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
                                label='Transfer Amount'
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

export default TransferForm