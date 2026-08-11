import { useEffect, useState } from "react";
import type { News } from "../../../types/news";
import { getNews, deleteNews } from "../services/newsService";

export default function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [search, setSearch] = useState("");

  async function loadNews() {
    const data = await getNews();
    setNews(data);
  }

  async function removeNews(id: string) {
    if (window.confirm("¿Seguro que deseas eliminar esta noticia?")) {
      await deleteNews(id);
      await loadNews();
    }
  }

  useEffect(() => {
    let active = true;
    void getNews().then((data) => {
      if (active) setNews(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.source.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()),
  );

  const stats = {
    total: news.length,
    fake: news.filter((n) => n.is_fake === true).length,
    real: news.filter((n) => n.is_fake === false).length,
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
            Gestión de Noticias
          </h1>
          <p className="text-on-surface-variant text-sm max-w-2xl">
            Administra, verifica y analiza la base de datos de noticias
            procesadas por el sistema RAG.
          </p>
        </div>
        <div className="w-full md:w-auto md:min-w-[400px]">
          <div className="relative flex items-center w-full">
            <span className="absolute left-4 text-on-surface-variant material-symbols-outlined pointer-events-none">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant text-on-surface rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-on-surface-variant transition-shadow font-body"
              placeholder="Buscar por título, ID o fuente..."
              type="text"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-high rounded-xl p-5 border border-surface-container-highest shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-surface-variant rounded-lg text-primary">
              <span className="material-symbols-outlined">dataset</span>
            </div>
            <div>
              <p className="text-on-surface-variant font-label text-xs uppercase tracking-wider">
                Total Procesadas
              </p>
              <p className="text-2xl font-headline font-bold text-on-surface">
                {stats.total}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-high rounded-xl p-5 border border-surface-container-highest shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-error/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-error-container/20 rounded-lg text-error">
              <span className="material-symbols-outlined">gpp_bad</span>
            </div>
            <div>
              <p className="text-on-surface-variant font-label text-xs uppercase tracking-wider">
                Detectadas Fake
              </p>
              <p className="text-2xl font-headline font-bold text-on-surface">
                {stats.fake}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-high rounded-xl p-5 border border-surface-container-highest shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-container/20 rounded-lg text-primary">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <div>
              <p className="text-on-surface-variant font-label text-xs uppercase tracking-wider">
                Verificadas Real
              </p>
              <p className="text-2xl font-headline font-bold text-on-surface">
                {stats.real}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container rounded-xl border border-outline-variant overflow-hidden shadow-lg flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high border-b border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Título</th>
                <th className="px-6 py-4 font-semibold">Fuente</th>
                <th className="px-6 py-4 font-semibold">Fecha</th>
                <th className="px-6 py-4 font-semibold text-center">
                  Etiqueta
                </th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm font-body divide-y divide-outline-variant/50">
              {filteredNews.map((item) => (
                <tr
                  key={item.id}
                  className="bg-surface hover:bg-surface-variant/50 transition-colors group"
                >
                  <td className="px-6 py-4 text-on-surface-variant font-mono">
                    #{item.id.substring(0, 8)}
                  </td>
                  <td
                    className="px-6 py-4 text-on-surface font-medium max-w-md truncate"
                    title={item.title}
                  >
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">
                    {item.source}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">
                    {item.published_at
                      ? new Date(item.published_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.is_fake === true && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-error-container text-on-error-container border border-error/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-error"></span>{" "}
                        FAKE
                      </span>
                    )}
                    {item.is_fake === false && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-container text-on-primary-container border border-primary/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{" "}
                        REAL
                      </span>
                    )}
                    {item.is_fake === undefined ||
                      (item.is_fake === null && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-variant text-on-surface-variant border border-outline-variant/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>{" "}
                          PENDIENTE
                        </span>
                      ))}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        aria-label="Ver detalles"
                        className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          visibility
                        </span>
                      </button>
                      <button
                        onClick={() => removeNews(item.id)}
                        aria-label="Eliminar"
                        className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-md transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredNews.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-on-surface-variant"
                  >
                    No se encontraron noticias.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
