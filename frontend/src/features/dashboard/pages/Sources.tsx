import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useToast } from "../../../components/common/Toast/Toast";
import ConfirmModal from "../../../components/common/Modal/ConfirmModal";

type Source = {
  id: string;
  name: string;
  base_url: string;
  source_type: string;
  priority: number;
  crawl_interval_minutes: number;
  is_active: boolean;
};

export default function Sources() {
  const toast = useToast();
  const [sources, setSources] = useState<Source[]>([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const [toggleTarget, setToggleTarget] = useState<Source | null>(null);
  const [error, setError] = useState("");

  const loadSources = async () => {
    const res = await api.get<Source[]>("/sources");
    setSources(res.data);
  };

  useEffect(() => {
    let active = true;
    void api
      .get<Source[]>("/sources")
      .then((r) => { if (active) setSources(r.data); })
      .catch(() => { if (active) setError("No se pudieron cargar las fuentes."); });
    return () => { active = false; };
  }, []);

  const createSource = async () => {
    if (!name || !url) return;
    setCreating(true);
    setError("");
    try {
      await api.post("/sources", {
        name,
        base_url: url,
        source_type: "official",
        priority: 100,
        crawl_interval_minutes: 1440,
        is_active: true,
      });
      setName("");
      setUrl("");
      await loadSources();
      toast({ type: "success", title: "Fuente registrada", message: `"${name}" fue agregada correctamente.` });
    } catch {
      setError("No se pudo registrar la fuente. Verifica la URL.");
      toast({ type: "error", title: "Error", message: "No se pudo registrar la fuente." });
    } finally {
      setCreating(false);
    }
  };

  const confirmToggle = async () => {
    if (!toggleTarget) return;
    try {
      await api.put(`/sources/${toggleTarget.id}`, { ...toggleTarget, is_active: !toggleTarget.is_active });
      await loadSources();
      toast({
        type: toggleTarget.is_active ? "warning" : "success",
        title: toggleTarget.is_active ? "Fuente desactivada" : "Fuente activada",
        message: `"${toggleTarget.name}" fue ${toggleTarget.is_active ? "desactivada" : "activada"}.`,
      });
    } catch {
      toast({ type: "error", title: "Error", message: "No se pudo actualizar la fuente." });
    } finally {
      setToggleTarget(null);
    }
  };

  const urlValid = url.startsWith("http://") || url.startsWith("https://");

  return (
    <>
      <ConfirmModal
        isOpen={!!toggleTarget}
        title={toggleTarget?.is_active ? "Desactivar fuente" : "Activar fuente"}
        message={`¿Confirmas ${toggleTarget?.is_active ? "desactivar" : "activar"} la fuente "${toggleTarget?.name}"?`}
        confirmLabel={toggleTarget?.is_active ? "Desactivar" : "Activar"}
        variant={toggleTarget?.is_active ? "warning" : "default"}
        onConfirm={confirmToggle}
        onCancel={() => setToggleTarget(null)}
      />

      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">
            Fuentes Confiables
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Estas URLs alimentan la base de conocimiento del sistema RAG.
          </p>
        </div>

        {/* Add form */}
        <div className="glass-panel rounded-2xl p-5 md:p-6 space-y-4">
          <h2 className="text-base font-headline font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              add_link
            </span>
            Registrar nueva fuente
          </h2>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Nombre</label>
              <input
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-high text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:border-primary focus:ring-primary/30 transition-all font-body"
                placeholder="Ej: Ministerio de Salud"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-label text-on-surface-variant uppercase tracking-wider">URL Base</label>
              <input
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-body bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 transition-all
                  ${url && !urlValid
                    ? "border-error/50 focus:border-error focus:ring-error/30"
                    : "border-outline-variant/40 focus:border-primary focus:ring-primary/30"
                  }`}
                placeholder="https://fuente.gob.bo"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              {url && !urlValid && (
                <p className="text-xs text-error-dim flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">error</span>
                  La URL debe iniciar con https:// o http://
                </p>
              )}
            </div>
            <div className="flex items-end pb-0">
              <button
                onClick={createSource}
                disabled={!name || !url || !urlValid || creating}
                className="shimmer-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-label font-semibold bg-gradient-to-r from-brand-emerald to-primary text-on-primary shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {creating ? (
                  <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                ) : (
                  <span className="material-symbols-outlined text-[16px]">add</span>
                )}
                Registrar
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-error px-3 py-2 rounded-lg bg-error-container/20 border border-error/20">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
              {error}
            </div>
          )}
        </div>

        {/* Sources list */}
        <div className="space-y-3">
          <h2 className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">dns</span>
            Fuentes registradas ({sources.length})
          </h2>

          {sources.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center">
              <span
                className="material-symbols-outlined text-5xl text-on-surface-variant/30 block mb-3"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                source_notes
              </span>
              <p className="font-headline font-semibold text-on-surface-variant">Sin fuentes registradas</p>
              <p className="text-xs text-on-surface-variant/60 mt-1">Agrega la primera fuente confiable arriba.</p>
            </div>
          ) : (
            sources.map((source) => (
              <div
                key={source.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border p-4 transition-all gap-4
                  ${source.is_active
                    ? "bg-surface-container-high border-outline-variant/20 hover:border-primary/30"
                    : "bg-surface-container border-outline-variant/10 opacity-60"
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                    ${source.is_active ? "bg-primary/10" : "bg-surface-variant"}
                  `}>
                    <span
                      className={`material-symbols-outlined text-[18px] ${source.is_active ? "text-primary" : "text-on-surface-variant"}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      link
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-headline font-semibold text-on-surface text-sm">{source.name}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-label font-semibold uppercase tracking-wide
                        ${source.is_active
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-surface-variant text-on-surface-variant border border-outline-variant/20"
                        }`}
                      >
                        {source.is_active ? "Activa" : "Inactiva"}
                      </span>
                    </div>
                    <a
                      href={source.base_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1 mt-0.5 max-w-xs truncate"
                    >
                      <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                      {source.base_url}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => setToggleTarget(source)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-label font-semibold transition-all
                    ${source.is_active
                      ? "text-error-dim border border-error/20 bg-error-container/10 hover:bg-error-container/20"
                      : "text-primary border border-primary/20 bg-primary/10 hover:bg-primary/20"
                    }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {source.is_active ? "toggle_off" : "toggle_on"}
                  </span>
                  {source.is_active ? "Desactivar" : "Activar"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
