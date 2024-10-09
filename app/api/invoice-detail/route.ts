import prisma from "@/app/lib/prisma";
import { Invoice } from "@/app/types/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const invoice_id = searchParams.get('id');

        if (!invoice_id) {
            return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
        }

        const dbInvoice = await prisma.invoice.findUnique({
            where: {
                id: parseInt(invoice_id),
            },
            select: {
                id: true,
                bank: {
                    select: {
                        id: true,
                        User: {
                            select: {
                                username: true,
                                profileImage: true,
                            },
                        }
                    },
                },
                transaction: {
                    select: {
                        id: true,
                        transaction_id: true,
                        transferAccount: {
                            select: {
                                accountNumber: true,
                                User: {
                                    select: {
                                        username: true,
                                        profileImage: true,
                                    }
                                }
                            }
                        }
                    },
                },
                bankId: true,
                amount: true,
                status: true,
                type: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!dbInvoice) {
            return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 })
        };

        const rtnInvoice: Invoice =
        {
            id: dbInvoice.id,
            bankId: dbInvoice.bankId,
            bankUsername: dbInvoice.bank.User.username,
            bankProfile: dbInvoice.bank.User.profileImage,
            amount: dbInvoice.amount,
            status: dbInvoice.status,
            type: dbInvoice.type,
            transactionId: dbInvoice.transaction?.transaction_id,
            transferAccount: dbInvoice.transaction?.transferAccount?.User.username,
            transferAccountProfile: dbInvoice.transaction?.transferAccount?.User.profileImage,
            createdAt: dbInvoice.createdAt.toDateString()
        }

        return NextResponse.json(rtnInvoice);
    } catch (error) {
        console.log(error);
    }
}
