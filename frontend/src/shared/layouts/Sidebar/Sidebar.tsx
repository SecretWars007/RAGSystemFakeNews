import { NavLink, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore";

const menu = [
  { name: "Dashboard",   path: "/dashboard", icon: "dashboard",  description: "Vista general" },
  { name: "Noticias",    path: "/news",       icon: "article",    description: "Base de noticias" },
  { name: "Análisis RAG",path: "/rag",        icon: "neurology",  description: "Verificar afirmaciones" },
  { name: "Fuentes",     path: "/sources",    icon: "dns",        description: "Fuentes confiables" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const logout = useAuthStore((state) => state.logout);
  const user   = useAuthStore((state) => state.user);
  const location = useLocation();

  const initials = user?.email?.substring(0, 2).toUpperCase() ?? "AD";

  return (
    <aside
      className={`
        w-[260px] bg-surface-container-high border-r border-outline-variant/20
        flex-col shrink-0 h-screen sticky top-0 z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:flex
        fixed md:relative
      `}
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-brand-emerald/15 bg-surface-container-highest relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-emerald/8 to-transparent" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-lg bg-primary-container/20 border border-primary/20 flex items-center justify-center overflow-hidden">
            <img src="/images/tiko_cartoon.png" alt="Tiko" className="w-full h-full object-cover" />
          </div>
          <div className="leading-none">
            <span className="font-headline font-black text-on-surface text-lg tracking-tight block">
              TIKO
            </span>
            <span className="text-primary text-[10px] tracking-[0.2em] uppercase font-label font-semibold">
              Sabueso AI
            </span>
          </div>
        </div>

        {/* Close button (mobile) */}
        <button
          onClick={onClose}
          className="ml-auto md:hidden text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        <p className="text-[10px] font-label font-semibold text-outline uppercase tracking-[0.15em] px-3 pb-2 pt-1">
          Menú principal
        </p>
        {menu.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                group relative overflow-hidden
                ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant"
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-primary rounded-r-full" />
              )}
              <span
                className={`material-symbols-outlined text-[20px] transition-colors shrink-0
                  ${isActive ? "text-primary" : "group-hover:text-primary"}
                `}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium block ${isActive ? "font-semibold" : ""}`}>
                  {item.name}
                </span>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-outline-variant/20 mt-auto">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-surface-variant transition-colors cursor-default mb-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/40 to-secondary-container flex items-center justify-center text-primary font-headline font-bold text-sm shrink-0 border border-primary/20">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-on-surface truncate">Admin</p>
            <p className="text-xs text-on-surface-variant truncate">
              {user?.email ?? "admin@tiko.ai"}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 py-2 px-3 rounded-lg text-error-dim hover:bg-error-container/15 hover:text-error transition-all text-sm font-medium font-label"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
