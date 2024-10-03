
import { auth } from "@/auth";
import Footer from "../../ui/footer/Footer";
import LeftSideBar from "../../ui/sidebar/LeftSideBar";
import RightSideBar from "../../ui/sidebar/RightSideBar";
import AppBar from "@/app/ui/appbar/AppBar";
import { getUser } from "@/app/lib/actions/user-actions";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await auth();
    const user = await getUser(session?.user?.id)

    return (
        <section className="flex flex-col h-screen bg-gradient-radial-circle from-pink-400 to-cyan-300">
            <div className="flex p-2 h-full gap-2">
                <LeftSideBar user={user}/>
                <section className='w-full bg-content1-900 rounded-2xl flex flex-col h-full overflow-hidden'>
                    <div>
                        <AppBar user={user} />
                    </div>
                    {children}
                </section>
                <RightSideBar user={user}/>
            </div>
        </section>
    );
}