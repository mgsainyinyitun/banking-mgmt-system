'use client'
import { useForm } from 'react-hook-form';
import FormInput from './FormInput'
import { faMoneyCheck, faUser } from '@fortawesome/free-solid-svg-icons'
import { zodResolver } from '@hookform/resolvers/zod';
import { BankAccountSchema, bankAccountSchema } from '@/app/types/form-shema';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { BANK_ACC_TYPE } from '@/app/constants/CONST';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createBankAccount } from '@/app/lib/actions/bank-actions';


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


interface bankAccountFormProps {
    userId: string,
}


const BankAccountForm = ({ userId }: bankAccountFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BankAccountSchema>({
        resolver: zodResolver(bankAccountSchema),
    });

    const onSubmitForm = async (data: BankAccountSchema
    ) => {
        console.log(data);
         await createBankAccount(data);
        // if (response?.errors) {
        // toast.error(response?.errors?.message);
        // }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmitForm)}
            className='bg-content1-900 m-5 w-full md:w-[50%] lg:w-[35%] rounded-xl p-4 flex flex-col gap-5'>
            <h1 className='text-2xl my-3 text-blue-500 font-semibold'>Create New Bank Account</h1>
            <FormInput
                register={register}
                label='Bank Account Holder Name'
                type='text'
                placeholder='Bank account holder name'
                icon={faUser}
                name={'username'}
                error={errors.username?.message}
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

            <input type='hidden' value={userId}  {...register('userId')} />

            <Button radius='sm' color='primary' size="lg" type='submit' isLoading={isSubmitting}>
                {isSubmitting ? 'Loading...' : 'Create'}
            </Button>
        </form>
    )
}

export default BankAccountForm