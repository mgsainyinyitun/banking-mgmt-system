'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, Divider, Chip, Avatar } from "@nextui-org/react";
import { Invoice } from '@/app/types/types';
import Loading from '@/app/ui/components/common/Loading'
import { DEFAULT_PROFILE, EXCHANGE_ICON } from '@/app/constants/CONSTANTS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

function padInvoiceId(id: number): string {
    return id.toString().padStart(6, '0');
}

const InvoiceDetail = ({ params }: { params: { id: string } }) => {
    const [invoice, setInvoice] = useState<Invoice>();

    async function getInvoiceDetail(id: string) {
        const res = await fetch(`/api/invoice-detail?id=${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch invoice detail');
        }
        const data = await res.json() as Invoice;
        setInvoice(data);

    }
    const downloadInvoicePDF = (invoice: Invoice) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Add content to the PDF
        doc.setFontSize(18);
        doc.text(`Invoice #${padInvoiceId(Number(invoice.id))}`, 20, 20);

        doc.setFontSize(12);
        doc.text(`Created on: ${invoice.createdAt}`, 20, 30);


        // Add profile images and transfer icon
        const fromImageData = invoice.bankProfile || DEFAULT_PROFILE;
        const toImageData = invoice.transferAccountProfile || DEFAULT_PROFILE;

        doc.addImage(fromImageData, 'JPEG', 20, 40, 10, 10);
        doc.text(`From: ${invoice.bankUsername || 'N/A'}`, 35, 47);

        // Add transfer icon
        doc.addImage(EXCHANGE_ICON, 'JPG', 90, 40, 10, 10);

        doc.addImage(toImageData, 'JPEG', 105, 40, 10, 10);
        doc.text(`To: ${invoice.transferAccount || 'N/A'}`, 120, 47);

        doc.text(`Amount: ${invoice.type === 'RECEIVE' ? '+' : '-'} $${invoice.amount}`, 20, 60);
        doc.text(`Status: ${invoice.status}`, 20, 70);
        doc.text(`Type: ${invoice.type}`, 20, 80);

        // Generate the PDF
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Create a temporary anchor element and trigger the download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `invoice_${padInvoiceId(Number(invoice.id))}.pdf`;
        link.click();

        // Clean up
        URL.revokeObjectURL(pdfUrl);
    };


    useEffect(() => {
        getInvoiceDetail(params.id);
    }, [params.id]);

    return (
        <div className="container mx-auto px-4 py-8 h-full">
            <Suspense fallback={<Loading />}>
                {invoice && (
                    <Card className="max-w-[600px] mx-auto">
                        <CardHeader className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <p className="text-md">Invoice #{padInvoiceId(Number(invoice.id))}</p>
                                <p className="text-small text-default-500">Created on: {invoice.createdAt}</p>
                            </div>
                            <button
                                onClick={() => downloadInvoicePDF(invoice)}
                                className="text-primary-400 hover:text-primary-500"
                            >
                                <FontAwesomeIcon icon={faDownload} size="lg" />
                            </button>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <p className="font-bold">Transfer:</p>
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            className='border-2 border-primary-400'
                                            src={invoice.bankProfile || DEFAULT_PROFILE}
                                            size="sm"
                                        />
                                        <span>{invoice.bankUsername || 'N/A'}</span>
                                        <FontAwesomeIcon icon={faExchangeAlt} className="mx-2 text-primary-400" />
                                        <Avatar
                                            className='border-2 border-primary-400'
                                            src={invoice.transferAccountProfile || DEFAULT_PROFILE}
                                            size="sm"
                                        />
                                        <span>{invoice.transferAccount || 'N/A'}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold">Amount:</p>
                                    <p className={`${invoice.type === 'RECEIVE' ? 'text-green-500' : 'text-red-500'}`}>
                                        {invoice.type === 'RECEIVE' ? '+' : '-'} ${invoice.amount}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold">Status:</p>
                                    <Chip color={invoice.status === 'PAID' ? 'success' : 'default'}>
                                        {invoice.status}
                                    </Chip>
                                </div>
                                <div>
                                    <p className="font-bold">Type:</p>
                                    <Chip>{invoice.type}</Chip>
                                </div>
                                <div>
                                    <p className="font-bold">Transaction ID:</p>
                                    <p>{invoice.transactionId || 'N/A'}</p>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                )}
            </Suspense>
        </div>
    )
}

export default InvoiceDetail