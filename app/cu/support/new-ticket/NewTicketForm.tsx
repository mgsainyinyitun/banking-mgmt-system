'use client'
import { createTicket } from '@/app/lib/actions/ticket-actions';
import { NewSupportTicketSchema, newSupportTicketSchema } from '@/app/types/form-shema';
import { TicketCategoryDescriptions } from '@/app/types/types';
import ResponsiveFormWraper from '@/app/ui/components/common/ResponsiveFormWraper';
import FormInput from '@/app/ui/components/form/FormInput';
import { faList, faTags, faTicketSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select, SelectItem, Textarea } from '@nextui-org/react';
import { TicketCategory, TicketPriority } from '@prisma/client';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const categories: TicketCategory[] = Object.keys(TicketCategory) as TicketCategory[];
const priorities: string[] = Object.keys(TicketPriority) as TicketPriority[];
interface NewTicketFormProps {
    userId: string | undefined,
}
const NewTicketForm = ({ userId }: NewTicketFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<NewSupportTicketSchema>({
        resolver: zodResolver(newSupportTicketSchema),
    });
    const onSubmitForm = async (data: NewSupportTicketSchema) => {
        const res = await createTicket(data);
        if (res.success) {
            toast.success('Successfully Created Ticket!')
            reset();
        } else {
            toast.error('Something went Wrong! Please Try again later');
        }
    }
    return (
        <ResponsiveFormWraper onSubmit={handleSubmit(onSubmitForm)}>
            <Toaster />
            <input type='hidden' value={userId} {...register('userId')} />
            <FormInput
                register={register}
                label='Title'
                type='text'
                placeholder='Your Issue ...'
                icon={faTicketSimple}
                name={'title'}
                error={errors.title?.message}
            />

            <Select
                label="Category"
                labelPlacement='outside'
                isRequired={true}
                radius='sm'
                size='lg'
                placeholder='Category'
                {...register('category')}
                startContent={<FontAwesomeIcon icon={faList} className='text-sky-400' />}
            >
                {categories.map((cat) => (
                    <SelectItem key={cat}>
                        {TicketCategoryDescriptions[cat]}
                    </SelectItem>
                ))}
            </Select>

            <Select
                label="Priority"
                labelPlacement='outside'
                isRequired={true}
                radius='sm'
                size='lg'
                placeholder='Priority'
                {...register('priority')}
                startContent={<FontAwesomeIcon icon={faTags} className='text-sky-400' />}
            >
                {priorities.map(pr => (
                    <SelectItem key={pr}>
                        {pr}
                    </SelectItem>
                ))}
            </Select>

            <Textarea
                {...register('description')}
                isInvalid={errors.description?.message ? true : false}
                size='lg'
                radius='sm'
                label="Description"
                placeholder="Detail of your issue"
                labelPlacement="outside"
                errorMessage={errors.description?.message}
                rows={15}
                minRows={15}
                name='description'
            />
            <Button radius='sm' color='primary' size="lg" type='submit' isLoading={isSubmitting}>
                {isSubmitting ? 'Loading...' : 'SUBMIT'}
            </Button>
        </ResponsiveFormWraper>
    )
}

export default NewTicketForm