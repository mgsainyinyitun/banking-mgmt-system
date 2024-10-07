'use server'

import { NewSupportTicketSchema } from "@/app/types/form-shema";
import prisma from "../prisma";
import { TicketCategory, TicketPriority, TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Ticket } from "@/app/types/types";

export async function getAllTickets(id: string): Promise<{ success: boolean, tickets: Ticket[] | undefined, message?: string }> {
    try {
        const tickets = await prisma.ticket.findMany({
            where: {
                userId: id
            }
        });
        if (!tickets) return { success: true, tickets: [], message: 'No Tickets Found!' }
        return {
            success: true,
            tickets: tickets as Ticket[]
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            tickets: undefined,
            message: 'Something  went wrong! Please try again later',
        }
    }
}


export async function createTicket(formData: NewSupportTicketSchema) {
    try {
        await prisma.ticket.create({
            data: {
                title: formData.title,
                description: formData.description,
                category: formData.category as TicketCategory,
                priority: formData.priority as TicketPriority,
                userId: formData.userId,
                status: TicketStatus.IN_PROGRESS,
            }
        });
        revalidatePath('/cu/ticket')
        return { success: true };

    } catch (error) {
        console.log(error);
        return { success: false };
    }
}


export async function deleteTicket(id: string | undefined) {
    if (!id) return;
    try {
        await prisma.ticket.delete({
            where: {
                id,
            }
        });
        revalidatePath('/cu/support')
        return { success: true }
    } catch (error) {
        console.log(error);
        return { success: false }
    }
}