import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-[#F3F7F4] text-[#123B2D]">
            <Sidebar />

            <div className="flex min-h-screen flex-1 flex-col">
                <Header />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-7xl">
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
