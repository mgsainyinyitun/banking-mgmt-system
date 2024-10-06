import { getBankAccounts } from "@/app/lib/actions/bank-actions";
import { Bank } from "@/app/types/types";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function TransactionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await auth();
    const banks: Bank[] = await getBankAccounts(session?.user?.id) as Bank[];
    console.log(banks);
    if (banks.length === 0) redirect('/cu');

    return (
        <Fragment>
            {children}
        </Fragment>
    );
}