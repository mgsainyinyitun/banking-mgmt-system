import LeftSideBar from '@/app/ui/sidebar/LeftSideBar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getUser } from '../lib/actions/user-actions';
import AppBar from '../ui/appbar/AppBar';
import AdminRightSideBar from '../ui/sidebar/AdminRightSideBar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
    const session = await auth();
    const user = await getUser(session?.user?.id)
    if (!user) return redirect('/sign-in');

    return (
        <section className="flex flex-col h-screen">
            <div className="flex p-2 h-full gap-2">
                <LeftSideBar user={user} />
                <section className='w-full bg-content1-900 rounded-2xl flex flex-col h-full overflow-hidden'>
                    <div>
                        <AppBar user={user} />
                    </div>
                    {children}
                </section>
                <AdminRightSideBar user={user} />
            </div>
        </section>
    );
}

export default AdminLayout;