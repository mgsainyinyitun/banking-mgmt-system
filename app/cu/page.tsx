import { auth } from "@/auth";
import { getBankAccounts } from "../lib/actions/bank-actions";
import { redirect } from "next/navigation";
import BankAccountForm from "../ui/components/form/BankAccountForm";
import { Bank } from "../types/types";

const page = async () => {
  const session = await auth();
  const id = session?.user?.id;

  if (id) {
    const banks: Bank[] = await getBankAccounts(id) as Bank[];
    if (banks.length !== 0) {
      redirect('/cu/dashboard')
    }
  }

  return (
    <section className="flex justify-center items-center w-full h-full">
      <BankAccountForm userId={id as string} />
    </section>
  )
}

export default page