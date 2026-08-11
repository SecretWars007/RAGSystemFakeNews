import { useEffect, useState } from "react";
import api from "../../../api/axios";

const baseServices = [
  { name: "Backend API", icon: "dns", status: "Operativo", type: "success" },
  {
    name: "PostgreSQL Vector DB",
    icon: "database",
    status: "Operativo",
    type: "success",
  },
  {
    name: "MLflow Models",
    icon: "memory",
    status: "Operativo",
    type: "success",
  },
];

function ServiceItem({
  name,
  icon,
  status,
  type,
}: {
  name: string;
  icon: string;
  status: string;
  type: string;
}) {
  const isError = type === "warning" || type === "error";
  const statusColor = isError ? "text-error-dim" : "text-on-surface-variant";
  const dotColor = isError
    ? "bg-error"
    : type === "info"
      ? "bg-secondary"
      : "bg-primary";

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-highest border border-outline-variant/20">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-on-surface-variant">
          {icon}
        </span>
        <span className="font-medium text-on-surface">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-label ${statusColor}`}>{status}</span>
        <span className="relative flex h-3 w-3">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColor} opacity-75`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${dotColor}`}
          ></span>
        </span>
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

  useEffect(() => {
    let active = true;
    void api
      .get("/knowledge/status")
      .then((response) => {
        if (active) {
          setKnowledge(response.data);
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const knowledgeServices = knowledge
    ? [
        {
          name: "Documentos",
          icon: "description",
          status: `${knowledge.documents} indexados`,
          type: "info",
        },
        {
          name: "Embeddings",
          icon: "scatter_plot",
          status: `${knowledge.embeddings} vectores`,
          type: "info",
        },
        {
          name: "Actualizaciones",
          icon: "sync",
          status: knowledge.pending_refreshes
            ? `${knowledge.pending_refreshes} pendientes`
            : "Al día",
          type: knowledge.pending_refreshes ? "warning" : "success",
        },
      ]
    : [];

  const allServices = [...baseServices, ...knowledgeServices];

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col">
      <h2 className="text-xl font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          monitoring
        </span>
        Estado del Sistema
      </h2>
      <div className="space-y-4 flex-1">
        {allServices.map((service, idx) => (
          <ServiceItem
            key={idx}
            name={service.name}
            icon={service.icon}
            status={service.status}
            type={service.type}
          />
        ))}
      </div>
    </div>
  );
}
