import { Link } from "react-router-dom";

const actions = [
  {
    title:       "Verificar Afirmación",
    description: "Analiza noticias con el motor RAG e IA",
    href:        "/rag",
    icon:        "fact_check",
    color:       "primary" as const,
  },
  {
    title:       "Agregar Noticia",
    description: "Registrar nueva noticia en la base de datos",
    href:        "/news/create",
    icon:        "add_circle",
    color:       "secondary" as const,
  },
  {
    title:       "Ver Historial",
    description: "Revisar todas las noticias procesadas",
    href:        "/news",
    icon:        "history",
    color:       "tertiary" as const,
  },
  {
    title:       "Gestionar Fuentes",
    description: "Administrar fuentes de conocimiento RAG",
    href:        "/sources",
    icon:        "dns",
    color:       "secondary" as const,
  },
];

const colorMap = {
  primary:   { icon: "text-primary",   bg: "bg-primary/10 group-hover:bg-primary/20",   border: "group-hover:border-primary/40" },
  secondary: { icon: "text-secondary", bg: "bg-secondary-container/20 group-hover:bg-secondary-container/30", border: "group-hover:border-secondary/40" },
  tertiary:  { icon: "text-tertiary-dim", bg: "bg-tertiary-container/10 group-hover:bg-tertiary-container/20", border: "group-hover:border-tertiary/40" },
};

export default function QuickActions() {
  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col">
      <h2 className="text-lg font-headline font-bold text-on-surface mb-5 flex items-center gap-2">
        <span
          className="material-symbols-outlined text-primary text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          bolt
        </span>
        Acciones Rápidas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
        {actions.map(({ title, description, href, icon, color }) => {
          const c = colorMap[color];
          return (
            <Link
              key={title}
              to={href}
              className={`
                flex items-center gap-3 p-4 rounded-xl
                bg-surface-container border border-outline-variant/20
                hover:bg-surface-container-high
                transition-all duration-200 group
                ${c.border}
              `}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${c.bg}`}>
                <span
                  className={`material-symbols-outlined text-[20px] ${c.icon}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                  {title}
                </p>
                <p className="text-xs text-on-surface-variant mt-0.5 truncate">{description}</p>
              </div>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary transition-all group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
