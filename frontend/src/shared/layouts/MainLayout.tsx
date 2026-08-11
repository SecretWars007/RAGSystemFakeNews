import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8 w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
