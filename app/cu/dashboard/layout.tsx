import { auth } from "@/auth";
import { Fragment } from "react";
import { getBankAccounts } from "@/app/lib/actions/bank-actions";
import { Bank } from "@/app/types/types";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await auth();
    const banks: Bank[] = await getBankAccounts(session?.user?.id) as Bank[];
    if (banks.length === 0) redirect('/cu');

    return (
        <Fragment>
            {children}
        </Fragment>
    );
}