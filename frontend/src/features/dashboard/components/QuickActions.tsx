import { Link } from "react-router-dom";

const actions = [
  {
    title: "Verificar Noticia",
    description: "Ingresar URL o texto para analizar",
    href: "/rag",
    icon: "fact_check",
  },
  {
    title: "Ver Noticias Recientes",
    description: "Revisar el historial de análisis",
    href: "/news",
    icon: "history",
  },
  {
    title: "Gestionar Fuentes",
    description: "Añadir o editar fuentes confiables RAG",
    href: "/sources",
    icon: "source",
  },
];

export default function QuickActions() {
  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col">
      <h2 className="text-xl font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">bolt</span>
        Acciones Rápidas
      </h2>
      <div className="flex flex-col gap-4 flex-1">
        {actions.map(({ title, description, href, icon }) => (
          <Link
            key={title}
            to={href}
            className="flex items-center gap-4 p-4 rounded-xl bg-surface-variant border border-outline-variant/30 hover:border-primary/50 hover:bg-surface-container-high transition-all group w-full text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors shadow-sm">
              <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
              <h4 className="font-semibold text-on-surface group-hover:text-primary transition-colors">
                {title}
              </h4>
              <p className="text-sm text-on-surface-variant">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
