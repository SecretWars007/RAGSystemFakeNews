import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { name: "Noticias", path: "/news", icon: "article" },
  { name: "Análisis RAG", path: "/rag", icon: "neurology" },
  { name: "Fuentes", path: "/sources", icon: "database" },
];

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="w-[260px] bg-surface-container-high border-r border-outline-variant flex-col hidden md:flex shrink-0 h-screen sticky top-0">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <span className="font-headline font-black text-primary text-xl tracking-tight leading-none">
            FakeNews
            <br />
            <span className="text-on-surface">RAG</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group relative overflow-hidden ${
                isActive
                  ? "bg-primary-container/10 text-primary font-semibold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r"></div>
                )}
                <span
                  className={`material-symbols-outlined text-[20px] ${!isActive ? "group-hover:text-primary transition-colors" : ""}`}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-outline-variant/30 mt-auto">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-headline font-bold">
            {user?.email?.substring(0, 2).toUpperCase() || "AD"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-on-surface truncate">
              Admin Usuario
            </p>
            <p className="text-xs text-on-surface-variant truncate">
              {user?.email || "admin@fakenewsrag.bo"}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-error-dim hover:bg-error-container/20 hover:text-error transition-colors text-sm font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
