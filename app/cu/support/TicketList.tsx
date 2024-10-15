'use client'
import { deleteTicket } from '@/app/lib/actions/ticket-actions'
import { Ticket, TicketCategoryDescriptions, TicketCatIcons } from '@/app/types/types'
import AcceptModal from '@/app/ui/components/common/AcceptModal'
import { faCircleCheck, faCircleQuestion, faPlus, faTicket, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion, AccordionItem, Card, Chip } from '@nextui-org/react'
import { TicketPriority } from '@prisma/client'
import Link from 'next/link'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface TicketListProps {
    tickets: Ticket[] | undefined,
}

const TicketList = ({ tickets }: TicketListProps) => {
    const [delOpen, setDelOpen] = useState<boolean>(false);
    const [toDeleteTicket, setToDeleteTicket] = useState<Ticket | undefined>();
    if (!tickets) return;
    const ticketDelete = (ticket: Ticket) => {
        setDelOpen(true);
        setToDeleteTicket(ticket);
    }

    const onDeleteAccept = async () => {
        console.log('ticket is :', toDeleteTicket);
        const res = await deleteTicket(toDeleteTicket?.id);
        if (res?.success) {
            toast.success('Successfully Delete the ticket!');
        } else {
            toast.error('Something went wrong! Please try again later');
        }
    }

    const renderSubTitle = (ticket: Ticket) => {
        const pri = ticket.priority;
        return (
            <div className='flex gap-3 items-center'>
                <Chip className='my-1'>{TicketCategoryDescriptions[ticket.category]}</Chip>
                <Chip
                    color={`${pri == TicketPriority.HIGH || pri === TicketPriority.URGENT ? 'danger' :
                        pri === TicketPriority.NORMAL ? 'success' : 'default'
                        }`}
                >{ticket.priority}</Chip>
            </div>
        )
    }

    const renderTitle = (ticket: Ticket) => {
        return (
            <div className='flex justify-between items-center'>
                {ticket.title}
            </div>
        )
    }

    return (
        <div className='flex w-full h-full p-3 items-center justify-center' >
            <Toaster />
            <div className='flex w-full md:w-[80%] lg:w-[75%] flex-col'>
                <div className='flex justify-end mr-5'>
                    <div className="bg-sky-400 hover:bg-sky-600 my-5 p-3 rounded-2xl">
                        <Link href="/cu/support/new-ticket" className="text-white bg-sky-300 my-5">
                            <span className="flex gap-2 justify-center items-center">
                                <FontAwesomeIcon icon={faPlus} />
                                <p>New Help Ticket </p>
                            </span>
                        </Link>
                    </div>
                </div>
                {tickets.length > 0 ? (
                    <Accordion selectionMode="multiple">
                        {
                            tickets.map((ticket, index) => {
                                return (
                                    <AccordionItem
                                        key={index}
                                        aria-label={ticket.title}
                                        startContent={
                                            <FontAwesomeIcon icon={TicketCatIcons[ticket.category]} size='lg' className='text-white bg-primary-400 p-3 rounded-full text-2xl' />
                                        }
                                        disableIndicatorAnimation
                                        subtitle={renderSubTitle(ticket)}
                                        title={renderTitle(ticket)}
                                        indicator={<FontAwesomeIcon icon={faTrash} className='text-danger-500' onClick={() => ticketDelete(ticket)} />}
                                    >
                                        <div className='rounded-lg min-h-12 text-primary-600 p-3'>
                                            <p className='text-violet-500 flex justify-start items-center gap-3'>
                                                <FontAwesomeIcon icon={faCircleQuestion} className='text-violet-500 text-3xl' />  {ticket.description}
                                            </p>
                                            <p className='flex justify-start items-center gap-3 mt-5 border-1 border-gray-500 p-3 min-h-5 rounded-lg'>
                                                <FontAwesomeIcon icon={faCircleCheck} className='text-3xl text-violet-500' />
                                                {ticket.responses ? ticket.responses : 'No Response'}
                                            </p>
                                        </div>

                                    </AccordionItem>
                                )
                            })
                        }

                    </Accordion>
                ) : (
                    <Card className="p-6 text-center">
                        <FontAwesomeIcon icon={faTicket} size="4x" className="text-primary-200 mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Tickets Found</h3>
                        <p className="text-gray-500">You haven&apos;t created any support tickets yet. Need help? Create a new ticket!</p>
                    </Card>
                )}
            </div>
            <AcceptModal
                isOpen={delOpen}
                onOpenChange={setDelOpen}
                acceptBtn="DELETE"
                title="DELETE TICKET"
                description="Are your sure you want to delete this ticket. Action cannot be undo!"
                onAccept={onDeleteAccept}
            />
        </div>
    )
}

export default TicketList