import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore";

const routeTitles: Record<string, { title: string; icon: string }> = {
  "/dashboard": { title: "Dashboard",      icon: "dashboard" },
  "/news":      { title: "Noticias",        icon: "article" },
  "/news/create":{ title: "Nueva Noticia",  icon: "add_circle" },
  "/rag":       { title: "Análisis RAG",    icon: "neurology" },
  "/sources":   { title: "Fuentes",         icon: "dns" },
};

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const current = routeTitles[location.pathname] ?? { title: "TIKO AI", icon: "troubleshoot" };

  const initials = user?.email?.substring(0, 2).toUpperCase() ?? "AD";

  return (
    <header className="bg-surface border-b border-outline-variant/20 flex items-center justify-between px-4 md:px-6 py-0 w-full z-20 sticky top-0 h-16 md:h-16 shrink-0">
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
          aria-label="Abrir menú"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <span className="hidden md:inline text-on-surface-variant font-label hover:text-primary cursor-pointer transition-colors">
            Sistema
          </span>
          <span className="hidden md:inline material-symbols-outlined text-[14px] text-outline">
            chevron_right
          </span>
          <span
            className="material-symbols-outlined text-[16px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {current.icon}
          </span>
          <span className="font-label font-semibold text-primary">{current.title}</span>
        </div>
      </div>

      {/* Right: date + notifications + avatar */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Date pill */}
        <div className="hidden sm:flex items-center gap-1.5 text-on-surface-variant text-xs bg-surface-container py-1.5 px-3 rounded-full border border-outline-variant/30">
          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
          <span>
            {new Date().toLocaleDateString("es-ES", {
              weekday: "short",
              month:  "short",
              day:    "numeric",
            })}
          </span>
        </div>

        {/* Notifications */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all relative"
          aria-label="Notificaciones"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-surface" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/40 to-secondary-container flex items-center justify-center text-primary font-headline font-bold text-xs border border-primary/20 cursor-default">
          {initials}
        </div>
      </div>
    </header>
  );
}
