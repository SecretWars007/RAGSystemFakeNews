import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/common/Toast/Toast";
import { createNews } from "../services/newsService";

const MIN_TITLE = 5;
const MIN_CONTENT = 30;

export default function CreateNews() {
  const navigate = useNavigate();
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const titleOk   = title.trim().length >= MIN_TITLE;
  const sourceOk  = source.trim().length > 0;
  const contentOk = content.trim().length >= MIN_CONTENT;
  const isValid   = titleOk && sourceOk && contentOk;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isValid) return;
    setLoading(true);
    try {
      await createNews({ title: title.trim(), source: source.trim(), content: content.trim() });
      toast({ type: "success", title: "Noticia creada", message: "La noticia fue registrada correctamente." });
      navigate("/news");
    } catch {
      toast({ type: "error", title: "Error al crear", message: "No se pudo registrar la noticia. Intenta nuevamente." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitAndAnalyze(event: React.FormEvent) {
    event.preventDefault();
    if (!isValid) return;
    setLoading(true);
    try {
      await createNews({ title: title.trim(), source: source.trim(), content: content.trim() });
      navigate("/rag", { state: { query: title.trim() } });
    } catch {
      toast({ type: "error", title: "Error al crear", message: "No se pudo registrar la noticia." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/news")}
          className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors text-sm font-label mb-4"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver a noticias
        </button>
        <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">
          Nueva Noticia
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Registra una noticia para su análisis y clasificación por el sistema RAG.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">
              Título <span className="text-error-dim">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Escribe el título de la noticia..."
              className={`w-full bg-surface-container-high text-on-surface rounded-xl px-4 py-3 border text-sm font-body
                focus:outline-none focus:ring-1 transition-all placeholder:text-on-surface-variant/50
                ${title && !titleOk
                  ? "border-error/50 focus:border-error focus:ring-error/30"
                  : "border-outline-variant/40 focus:border-primary focus:ring-primary/30"
                }`}
            />
            {title && !titleOk && (
              <p className="text-xs text-error-dim flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                Mínimo {MIN_TITLE} caracteres
              </p>
            )}
          </div>

          {/* Source */}
          <div className="space-y-1.5">
            <label className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">
              Fuente <span className="text-error-dim">*</span>
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Ej: El Deber, La Razón, Ministerio de Salud..."
              className="w-full bg-surface-container-high text-on-surface rounded-xl px-4 py-3 border border-outline-variant/40 text-sm font-body focus:outline-none focus:ring-1 focus:border-primary focus:ring-primary/30 transition-all placeholder:text-on-surface-variant/50"
            />
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                Contenido <span className="text-error-dim">*</span>
              </label>
              <span className={`text-xs font-label ${content.length < MIN_CONTENT ? "text-on-surface-variant" : "text-primary"}`}>
                {content.length} / {MIN_CONTENT} mín.
              </span>
            </div>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Pega o escribe el contenido completo de la noticia..."
              className="w-full bg-surface-container-high text-on-surface rounded-xl px-4 py-3 border border-outline-variant/40 text-sm font-body focus:outline-none focus:ring-1 focus:border-primary focus:ring-primary/30 transition-all placeholder:text-on-surface-variant/50 resize-none"
            />
            {content.length > 0 && !contentOk && (
              <p className="text-xs text-error-dim flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                Mínimo {MIN_CONTENT} caracteres
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/news")}
              className="px-5 py-2.5 rounded-xl text-sm font-label font-semibold text-on-surface-variant bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmitAndAnalyze}
              disabled={loading || !isValid}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-label font-semibold text-secondary border border-secondary/30 bg-secondary-container/10 hover:bg-secondary-container/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px]">neurology</span>
              Guardar y Analizar
            </button>
            <button
              type="submit"
              disabled={loading || !isValid}
              className="shimmer-btn flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-label font-semibold bg-gradient-to-r from-brand-emerald to-primary text-on-primary shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
              ) : (
                <span className="material-symbols-outlined text-[16px]">save</span>
              )}
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
