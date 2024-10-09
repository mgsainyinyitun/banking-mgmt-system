import { Suspense } from 'react';
import Loading from '@/app/ui/components/common/Loading';
import InvoiceList from './InvoiceList';
import { auth } from '@/auth';


export default async function InvoicesPage() {
  const session = await auth();
  return (
    <div className="container mx-auto px-4 py-8 h-full">
      <Suspense fallback={<Loading />}>
        <InvoiceList userId={session?.user?.id} />
      </Suspense>
    </div>
  );
}
