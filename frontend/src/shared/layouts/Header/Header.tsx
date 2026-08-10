import { Bell } from "lucide-react";

import { useAuthStore } from "../../../features/auth/store/authStore";

export default function Header() {
    const token = useAuthStore((state) => state.token);

    return (
        <header className="flex h-20 items-center justify-between border-b border-[#D8F3DC] bg-white/90 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
            <div>
                <h2 className="text-lg font-semibold text-[#123B2D] sm:text-xl">
                    Verificación inteligente de noticias
                </h2>
                <p className="text-xs text-[#5C6F66] sm:text-sm">
                    RAG + IA generativa + análisis contextual
                </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-5">
                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8F3DC] bg-[#F5FBF7] text-[#1F7A4E] transition hover:bg-[#EAF7F0]"
                    aria-label="Notificaciones"
                >
                    <Bell size={18} />
                </button>

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F7A4E] text-sm font-bold text-white">
                        U
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-[#123B2D]">Usuario</p>
                        <span className="text-xs text-[#5C6F66]">
                            {token ? "Conectado" : "Invitado"}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
