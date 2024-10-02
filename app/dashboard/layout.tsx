
import Footer from "../ui/footer/Footer";
import LeftSideBar from "../ui/sidebar/LeftSideBar";
import RightSideBar from "../ui/sidebar/RightSideBar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return ( //bg-gradient-to-r from-violet-200 to-pink-200
        <div className="flex flex-col h-screen bg-gradient-radial-circle from-pink-400 to-cyan-300">
            <div className="flex p-2 h-full gap-2">
                <LeftSideBar />
                {children}
                <RightSideBar />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}