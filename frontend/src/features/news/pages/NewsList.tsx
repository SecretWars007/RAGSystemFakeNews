import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { News } from "../../../types/news";
import { getNews, deleteNews } from "../services/newsService";
import { useToast } from "../../../components/common/Toast/Toast";
import ConfirmModal from "../../../components/common/Modal/ConfirmModal";
import { SkeletonRow } from "../../../components/common/Skeleton/Skeleton";

type FilterLabel = "all" | "fake" | "real" | "pending";

const ITEMS_PER_PAGE = 10;

export default function NewsList() {
  const toast = useToast();

  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterLabel>("all");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  async function loadNews() {
    setLoading(true);
    try {
      const data = await getNews();
      setNews(data);
    } finally {
      setLoading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteNews(deleteTarget);
      toast({ type: "success", title: "Noticia eliminada", message: "La noticia fue eliminada correctamente." });
      await loadNews();
    } catch {
      toast({ type: "error", title: "Error al eliminar", message: "No se pudo eliminar la noticia." });
    } finally {
      setDeleteTarget(null);
    }
  }

  useEffect(() => {
    void loadNews();
  }, []);

  // Filter + search
  const filtered = news.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q);

    const matchFilter =
      filter === "all" ? true
      : filter === "fake"    ? item.is_fake === true
      : filter === "real"    ? item.is_fake === false
      : /* pending */         item.is_fake == null;

    return matchSearch && matchFilter;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const stats = {
    total:   news.length,
    fake:    news.filter((n) => n.is_fake === true).length,
    real:    news.filter((n) => n.is_fake === false).length,
    pending: news.filter((n) => n.is_fake == null).length,
  };

  const filterButtons: { label: string; value: FilterLabel; count: number; color: string }[] = [
    { label: "Todas",    value: "all",     count: stats.total,   color: "text-on-surface-variant hover:text-on-surface" },
    { label: "Fake",     value: "fake",    count: stats.fake,    color: "text-error-dim hover:text-error" },
    { label: "Real",     value: "real",    count: stats.real,    color: "text-primary hover:text-primary" },
    { label: "Pendiente",value: "pending", count: stats.pending, color: "text-tertiary-dim hover:text-tertiary-dim" },
  ];

  return (
    <>
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Eliminar noticia"
        message="Esta acción no se puede deshacer. ¿Estás seguro?"
        confirmLabel="Sí, eliminar"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex flex-col gap-6 animate-fade-in">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">
              Gestión de Noticias
            </h1>
            <p className="text-sm text-on-surface-variant mt-1 max-w-lg">
              Administra, verifica y analiza la base de datos de noticias procesadas por el sistema RAG.
            </p>
          </div>
          <Link
            to="/news/create"
            className="shimmer-btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-emerald to-primary text-on-primary font-label font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Nueva noticia
          </Link>
        </div>

        {/* Stats mini bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total",     count: stats.total,   icon: "dataset",     color: "text-on-surface",  bg: "bg-surface-container-high" },
            { label: "Fake",      count: stats.fake,    icon: "gpp_bad",     color: "text-error-dim",   bg: "bg-error-container/15" },
            { label: "Real",      count: stats.real,    icon: "verified",    color: "text-primary",     bg: "bg-primary/10" },
            { label: "Pendiente", count: stats.pending, icon: "pending",     color: "text-tertiary-dim",bg: "bg-tertiary-container/10" },
          ].map(({ label, count, icon, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-4 flex items-center gap-3 border border-outline-variant/20`}>
              <span className={`material-symbols-outlined text-xl ${color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {icon}
              </span>
              <div>
                <p className={`text-xl font-headline font-bold ${color}`}>{count}</p>
                <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar: search + filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-on-surface-variant pointer-events-none">
              search
            </span>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-on-surface-variant text-sm font-body transition-all"
              placeholder="Buscar por título, ID o fuente..."
              type="text"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex gap-1.5 bg-surface-container-high rounded-xl p-1 border border-outline-variant/20 shrink-0">
            {filterButtons.map(({ label, value, count, color }) => (
              <button
                key={value}
                onClick={() => { setFilter(value); setPage(1); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-label font-semibold transition-all
                  ${filter === value
                    ? "bg-surface-container-highest text-on-surface shadow-sm"
                    : `${color} hover:bg-surface-variant`
                  }`}
              >
                {label}
                <span className="bg-surface-container-highest px-1.5 py-0.5 rounded-full text-[10px] font-mono">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass-panel rounded-2xl border border-outline-variant/20 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high border-b border-outline-variant/30">
                  {["ID", "Título", "Fuente", "Fecha", "Etiqueta", "Acciones"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-4 md:px-6 py-3.5 text-[10px] font-label font-semibold text-on-surface-variant uppercase tracking-[0.1em]
                        ${h === "Acciones" ? "text-right" : ""}
                        ${h === "Etiqueta" ? "text-center" : ""}
                        ${i === 0 ? "hidden md:table-cell" : ""}
                      `}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                  : paginated.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-surface-container-high/60 transition-colors group"
                      >
                        <td className="hidden md:table-cell px-4 md:px-6 py-3.5 text-xs text-on-surface-variant font-mono">
                          #{item.id.substring(0, 8)}
                        </td>
                        <td className="px-4 md:px-6 py-3.5 font-medium text-on-surface max-w-[200px] md:max-w-sm truncate text-sm" title={item.title}>
                          {item.title}
                        </td>
                        <td className="px-4 md:px-6 py-3.5 text-xs text-on-surface-variant hidden sm:table-cell">
                          {item.source}
                        </td>
                        <td className="px-4 md:px-6 py-3.5 text-xs text-on-surface-variant hidden lg:table-cell whitespace-nowrap">
                          {item.published_at
                            ? new Date(item.published_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
                            : "—"}
                        </td>
                        <td className="px-4 md:px-6 py-3.5 text-center">
                          {item.is_fake === true && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-label font-semibold bg-error-container/40 text-error border border-error/20 uppercase tracking-wide">
                              <span className="w-1.5 h-1.5 rounded-full bg-error" />
                              Fake
                            </span>
                          )}
                          {item.is_fake === false && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-label font-semibold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              Real
                            </span>
                          )}
                          {item.is_fake == null && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-label font-semibold bg-surface-variant text-on-surface-variant border border-outline-variant/30 uppercase tracking-wide">
                              <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant" />
                              Pendiente
                            </span>
                          )}
                        </td>
                        <td className="px-4 md:px-6 py-3.5">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                              to="/rag"
                              state={{ query: item.title }}
                              aria-label="Analizar en RAG"
                              className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all"
                            >
                              <span className="material-symbols-outlined text-[18px]">neurology</span>
                            </Link>
                            <button
                              onClick={() => setDeleteTarget(item.id)}
                              aria-label="Eliminar noticia"
                              className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-all"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                {!loading && paginated.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <span
                        className="material-symbols-outlined text-5xl text-on-surface-variant/30 block mb-3"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        search_off
                      </span>
                      <p className="font-headline font-semibold text-on-surface-variant">
                        No se encontraron noticias
                      </p>
                      <p className="text-xs text-on-surface-variant/60 mt-1">
                        {search ? "Intenta con otro término de búsqueda" : "Agrega noticias con el botón Nueva noticia"}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-3 border-t border-outline-variant/20 bg-surface-container-high/30">
              <p className="text-xs text-on-surface-variant font-label">
                {filtered.length} noticias — Página {currentPage} de {totalPages}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs rounded-lg font-label text-on-surface-variant hover:text-on-surface hover:bg-surface-variant disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-3 py-1.5 text-xs rounded-lg font-label font-semibold transition-colors
                        ${currentPage === p
                          ? "bg-primary text-on-primary"
                          : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant"
                        }`}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs rounded-lg font-label text-on-surface-variant hover:text-on-surface hover:bg-surface-variant disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
