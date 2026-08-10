import { NavLink } from "react-router-dom";
import { LayoutDashboard, Newspaper, BrainCircuit, Database, LogOut } from "lucide-react";

import { useAuthStore } from "../../../features/auth/store/authStore";

const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Noticias", path: "/news", icon: Newspaper },
    { name: "Análisis RAG", path: "/rag", icon: BrainCircuit },
    { name: "Fuentes", path: "/sources", icon: Database },
];

export default function Sidebar() {
    const logout = useAuthStore((state) => state.logout);

    return (
        <aside className="flex min-h-screen w-64 flex-col bg-[#123B2D] text-white shadow-[12px_0_32px_rgba(18,59,45,0.12)]">
            <div className="border-b border-white/10 p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl shadow-inner">
                    🧠
                </div>

                <h1 className="mt-4 text-lg font-bold">FakeNewsRAGSystem</h1>
                <span className="text-sm text-[#D8F3DC]">Verificación inteligente</span>
            </div>

            <nav className="flex-1 space-y-2 px-4 py-5">
                {menu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-[#1F7A4E] text-white shadow-[0_10px_20px_rgba(31,122,78,0.25)]"
                                        : "text-[#E5F3EA] hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >
                            <Icon size={18} />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <button
                type="button"
                onClick={logout}
                className="flex items-center gap-3 border-t border-white/10 px-5 py-4 text-left text-sm font-medium text-[#E5F3EA] transition hover:bg-white/5"
            >
                <LogOut size={18} />
                Cerrar sesión
            </button>
        </aside>
    );
}
