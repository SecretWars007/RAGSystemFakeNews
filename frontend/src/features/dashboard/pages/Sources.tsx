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
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            className="rounded-lg border p-3"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="rounded-lg border p-3"
            placeholder="https://fuente.gov.bo"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={createSource} disabled={!name || !url}>
            Registrar fuente
          </Button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </Card>
      <Card title="Fuentes registradas">
        <div className="space-y-3">
          {sources.map((source) => (
            <div
              key={source.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-semibold text-[#1B4332]">{source.name}</p>
                <a
                  className="text-sm text-blue-700 underline"
                  href={source.base_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {source.base_url}
                </a>
              </div>
              <Button onClick={() => void toggleSource(source)}>
                {source.is_active ? "Desactivar" : "Activar"}
              </Button>
            </div>
          ))}
          {!sources.length && (
            <p className="text-sm text-[#5E6C61]">
              Aún no hay fuentes registradas.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
