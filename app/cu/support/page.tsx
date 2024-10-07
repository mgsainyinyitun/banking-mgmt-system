import React from 'react'
import TicketList from './TicketList'
import { getAllTickets } from '@/app/lib/actions/ticket-actions'
import { auth } from '@/auth'
import { Ticket } from '@/app/types/types'

const Support = async () => {
    const session = await auth();
    let tickets: Ticket[] | undefined = [];
    if (session?.user.id) {
        tickets = (await getAllTickets(session.user.id)).tickets;
    }

    return (
        <div>
            <TicketList tickets={tickets} />
        </div>
    )
}

export default Support