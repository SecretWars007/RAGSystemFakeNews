import { useEffect, useState } from "react";
import api from "../../../api/axios";

const baseServices = [
  { name: "Backend API",        icon: "dns",      key: "api" },
  { name: "PostgreSQL / pgvector", icon: "database", key: "db" },
  { name: "MLflow Models",      icon: "memory",   key: "ml" },
];

type ServiceStatus = "ok" | "warning" | "error" | "loading";

interface ServiceItemProps {
  readonly name: string;
  readonly icon: string;
  readonly status: ServiceStatus;
  readonly detail?: string;
  readonly action?: React.ReactNode;
}

function ServiceItem({ name, icon, status, detail, action }: ServiceItemProps) {
  const dotColor = {
    ok:      "bg-primary",
    warning: "bg-tertiary-dim",
    error:   "bg-error",
    loading: "bg-outline",
  }[status];

  const textColor = {
    ok:      "text-primary",
    warning: "text-tertiary-dim",
    error:   "text-error",
    loading: "text-on-surface-variant",
  }[status];

  const label = {
    ok:      detail ?? "Operativo",
    warning: detail ?? "Advertencia",
    error:   detail ?? "Error",
    loading: "Verificando...",
  }[status];

  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-surface-container-highest/50 border border-outline-variant/15 hover:border-outline-variant/40 transition-colors">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{icon}</span>
        <span className="text-sm font-medium text-on-surface">{name}</span>
      </div>
      <div className="flex items-center gap-4">
        {action}
        <div className="flex items-center gap-2">
          <span className={`text-xs font-label ${textColor}`}>{label}</span>
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColor} opacity-60`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColor}`} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SystemStatus() {
  const [knowledge, setKnowledge] = useState<{
    documents: number;
    embeddings: number;
    pending_refreshes: number;
  } | null>(null);
  const [apiOk, setApiOk] = useState<boolean | null>(null);
  const [isIngesting, setIsIngesting] = useState(false);

  const fetchStatus = (active: boolean) => {
    api.get("/knowledge/status").then((r) => {
      if (active) setKnowledge(r.data);
    }).catch(() => undefined);
  };

  useEffect(() => {
    let active = true;

    // Check API health
    void api.get("/health").then(() => { if (active) setApiOk(true); }).catch(() => { if (active) setApiOk(false); });

    // Check knowledge status
    fetchStatus(active);

    return () => { active = false; };
  }, []);

  const handleIngest = async () => {
    setIsIngesting(true);
    try {
      await api.post("/knowledge/ingest");
      fetchStatus(true);
    } catch {
      // Ignorar
    } finally {
      setIsIngesting(false);
    }
  };

  const knowledgeItems: ServiceItemProps[] = knowledge
    ? [
        { name: "Documentos indexados", icon: "description",  status: "ok",      detail: `${knowledge.documents.toLocaleString()} docs` },
        { name: "Vectores embeddings",  icon: "scatter_plot", status: "ok",      detail: `${knowledge.embeddings.toLocaleString()} vecs` },
        { name: "Actualizaciones RAG",  icon: "sync",         status: knowledge.pending_refreshes ? "warning" : "ok",
          detail: knowledge.pending_refreshes ? `${knowledge.pending_refreshes} pendientes` : "Al día",
          action: (
            <button
              type="button"
              onClick={handleIngest}
              disabled={isIngesting}
              className="text-[10px] px-2 py-1 rounded-md bg-surface-variant hover:bg-surface-bright text-on-surface-variant font-label uppercase font-bold transition-colors disabled:opacity-50"
            >
              {isIngesting ? "Procesando..." : "Procesar"}
            </button>
          )
        },
      ]
    : [];

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col">
      <h2 className="text-lg font-headline font-bold text-on-surface mb-5 flex items-center gap-2">
        <span
          className="material-symbols-outlined text-primary text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          monitor_heart
        </span>
        {" "}Estado del Sistema
      </h2>

      <div className="space-y-2 flex-1">
        {/* Core services */}
        {baseServices.map(({ name, icon, key }) => {
          let currentStatus: ServiceStatus = "ok";
          if (key === "api") {
            if (apiOk === null) currentStatus = "loading";
            else if (!apiOk) currentStatus = "error";
          }
          return (
            <ServiceItem
              key={key}
              name={name}
              icon={icon}
              status={currentStatus}
            />
          );
        })}

        {/* Knowledge base */}
        {knowledge && knowledgeItems.length > 0 && (
          <>
            <div className="pt-2 pb-1">
              <p className="text-[10px] font-label font-semibold text-outline uppercase tracking-[0.15em]">
                Base de conocimiento
              </p>
            </div>
            {knowledgeItems.map((item) => (
              <ServiceItem key={item.name} {...item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
