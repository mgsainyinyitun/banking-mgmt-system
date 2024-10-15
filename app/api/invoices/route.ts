import prisma from '@/app/lib/prisma';
import { Invoice } from '@/app/types/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        let username = searchParams.get('username') as string | undefined;
        const gte = searchParams.get('gte') as string | undefined;
        const lte = searchParams.get('lte') as string | undefined;

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        if (username === 'undefined') {
            username = undefined;
        }

        const invoices = await prisma.invoice.findMany({
            where: {
                bank: {
                    User: {
                        id: userId,
                        username: {
                            contains: username,
                        }
                    }
                },
                createdAt: {
                    gte: gte === 'undefined' ? undefined : gte ? new Date(gte) : undefined,
                    lte: lte === 'undefined' ? undefined : lte ? new Date(lte) : undefined,
                }

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

        const rtnInvoices: Invoice[] = invoices.map((invoice) => {
            const rtn: Invoice = {
                id: invoice.id,
                bankId: invoice.bankId,
                amount: invoice.amount,
                status: invoice.status,
                type: invoice.type,
                transactionId: invoice.transaction?.transaction_id,
                transferAccount: invoice.transaction?.transferAccount?.User.username,
                transferAccountProfile: invoice.transaction?.transferAccount?.User.profileImage,
                createdAt: invoice.createdAt.toDateString(),
            };
            return rtn;
        });

        console.log(rtnInvoices);
        return NextResponse.json(rtnInvoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { bankId, amount, type } = body;

        if (!bankId || !amount || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newInvoice = await prisma.invoice.create({
            data: {
                bankId,
                amount,
                type,
            },
        });

        return NextResponse.json(newInvoice, { status: 201 });
    } catch (error) {
        console.error('Error creating invoice:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}