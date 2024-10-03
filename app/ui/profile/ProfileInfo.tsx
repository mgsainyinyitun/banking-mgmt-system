'use client'

import { ProfileSchema, profileShema } from "@/app/types/form-shema";
import { UserInfo } from "@/app/types/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../components/form/FormInput";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import FormDate from "../components/form/FormDate";
import { Button, Textarea } from "@nextui-org/react";
import { formatForInputDate } from "@/app/lib/utils";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { updateUser } from "@/app/lib/actions/user-actions";

interface profileInfoProps {
    user: UserInfo
}

const ProfileInfo = ({ user }: profileInfoProps) => {
    const { control, setValue, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileSchema>({
        resolver: zodResolver(profileShema),
    });

    const [prUser, setUser] = useState<UserInfo>(user);

    const [change, setChange] = useState(false);
    const onSubmitForm = async (data: ProfileSchema) => {
        const response = await updateUser(data,'/cu/dashboard/profile');

        if (response.success) {
            if (response.user) setUser(response.user);
            toast.success('Profile updated successfully!');
        } else {
            toast.error(response.message ? response.message : 'Something went wrong! Please try again.');
        }
        setChange(false);
    }
    
    return (
        <div className="flex flex-col gap-3 p-5 bg-content1-900 rounded-2xl w-full md:w-2/3 mx-auto h-full">
            <Toaster />
            <form
                onSubmit={handleSubmit(onSubmitForm)}
                className="flex flex-col gap-3">
                <h1 className='text-3xl text-blue-300 font-semibold my-3'>User Infomation : </h1>

                <input type='hidden' value={user?.id}  {...register('id')} />

                <FormInput
                    register={register}
                    label='Full Name'
                    type='text'
                    value={prUser?.username}
                    icon={faUser}
                    name={'username'}
                    error={errors.username?.message}
                    onChange={() => setChange(true)}
                />
                <FormInput
                    register={register}
                    label='NRC'
                    type='text'
                    value={prUser?.nrc}
                    icon={faUser}
                    name={'nrc'}
                    error={errors.nrc?.message}
                    onChange={() => setChange(true)}
                />

                <FormDate
                    control={control}
                    label='Date of Birth'
                    name={'dob'}
                    error={errors.dob?.message}
                    setValue={(f: any, v: any) => setValue(f, v)}
                    value={formatForInputDate(prUser?.dob)}
                    onChange={() => setChange(true)}
                />

                <div className='flex gap-2'>
                    <FormInput
                        register={register}
                        label='E-mail'
                        type='email'
                        value={prUser?.email}
                        icon={faEnvelope}
                        name={'email'}
                        error={errors.email?.message}
                        onChange={() => setChange(true)}
                    />
                    <FormInput
                        register={register}
                        label='Phone Number'
                        type='text'
                        value={prUser?.phone}
                        icon={faPhone}
                        name={'phone'}
                        error={errors.phone?.message}
                        onChange={() => setChange(true)}
                    />
                </div>

                <div className='flex gap-2'>
                    <FormInput
                        register={register}
                        label='City'
                        type='text'
                        value={prUser?.city}
                        name={'city'}
                        error={errors.city?.message}
                        onChange={() => setChange(true)}
                    />
                    <FormInput
                        register={register}
                        label='State'
                        type='text'
                        value={prUser?.state}
                        name={'state'}
                        error={errors.state?.message}
                        onChange={() => setChange(true)}
                    />
                </div>
                <Textarea
                    {...register('address')}
                    isInvalid={errors.address?.message ? true : false}
                    size='lg'
                    radius='sm'
                    label="Address"
                    defaultValue={prUser?.address}
                    labelPlacement="outside"
                    name={'address'}
                    errorMessage={errors.address?.message}
                    onChange={() => { setChange(true) }}
                />

                <Button radius='sm' color='primary' size="lg" type='submit' isLoading={isSubmitting} isDisabled={!change}>
                    {isSubmitting ? 'Loading...' : 'UPDATE'}
                </Button>

            </form>
        </div>
    )
}

export default ProfileInfo