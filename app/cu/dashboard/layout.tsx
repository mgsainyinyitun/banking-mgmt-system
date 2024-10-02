
import { auth } from "@/auth";
import Footer from "../../ui/footer/Footer";
import LeftSideBar from "../../ui/sidebar/LeftSideBar";
import RightSideBar from "../../ui/sidebar/RightSideBar";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    if (session) {
        console.log('async :', session.user?.type);
    }
    return (
        <section className="flex flex-col h-screen bg-gradient-radial-circle from-pink-400 to-cyan-300">
            <div className="flex p-2 h-full gap-2">
                <LeftSideBar />
                {children}
                <RightSideBar />
            </div>
        </section>
    );
}