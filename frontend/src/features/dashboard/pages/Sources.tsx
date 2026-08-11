import { useEffect, useState } from "react";
import api from "../../../api/axios";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";

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
  const [sources, setSources] = useState<Source[]>([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const loadSources = async () =>
    setSources((await api.get<Source[]>("/sources")).data);
  useEffect(() => {
    let active = true;
    void api
      .get<Source[]>("/sources")
      .then((response) => {
        if (active) setSources(response.data);
      })
      .catch(() => {
        if (active) setError("No se pudieron cargar las fuentes.");
      });
    return () => {
      active = false;
    };
  }, []);
  const createSource = async () => {
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
    } catch {
      setError("No se pudo registrar la fuente. Verifica la URL.");
    }
  };
  const toggleSource = async (source: Source) => {
    await api.put(`/sources/${source.id}`, {
      ...source,
      is_active: !source.is_active,
    });
    await loadSources();
  };
  return (
    <div className="space-y-6">
      <Card
        title="Fuentes confiables"
        description="Solo estas URLs alimentan la base de conocimiento."
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-label text-on-surface-variant ml-1">Nombre de la Fuente</label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all duration-300 focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald focus:shadow-[0_0_15px_rgba(16,185,129,0.15)] font-body"
              placeholder="Ej: Ministerio de Salud"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-label text-on-surface-variant ml-1">URL Base</label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all duration-300 focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald focus:shadow-[0_0_15px_rgba(16,185,129,0.15)] font-body"
              placeholder="https://fuente.gov.bo"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="pb-[2px]">
            <Button onClick={createSource} disabled={!name || !url} className="w-full md:w-auto px-6 py-3">
              Registrar fuente
            </Button>
          </div>
        </div>
        {error && <p className="mt-4 text-sm text-error font-body px-1">{error}</p>}
      </Card>
      <Card title="Fuentes registradas">
        <div className="space-y-4 mt-2">
          {sources.map((source) => (
            <div
              key={source.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high p-5 hover:border-primary/50 transition-colors gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-headline font-semibold text-on-surface">
                    {source.name}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-label font-medium ${
                      source.is_active
                        ? "bg-primary-container/20 text-primary border border-primary/20"
                        : "bg-surface-variant text-on-surface-variant border border-outline-variant/30"
                    }`}
                  >
                    {source.is_active ? "Activa" : "Inactiva"}
                  </span>
                </div>
                <a
                  className="text-sm font-body text-primary hover:text-brand-emerald transition-colors inline-flex items-center gap-1"
                  href={source.base_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="material-symbols-outlined text-xs">link</span>
                  {source.base_url}
                </a>
              </div>
              <Button onClick={() => void toggleSource(source)} variant={source.is_active ? "outline" : "primary"}>
                {source.is_active ? "Desactivar" : "Activar"}
              </Button>
            </div>
          ))}
          {!sources.length && (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-2">
                source_notes
              </span>
              <p className="text-sm font-body text-on-surface-variant">
                Aún no hay fuentes registradas.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
