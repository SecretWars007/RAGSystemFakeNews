import type { News } from "../../../types/news";
import Modal from "../../../components/common/Modal/Modal";

interface NewsDetailModalProps {
  readonly news: News | null;
  readonly onClose: () => void;
}

export default function NewsDetailModal({ news, onClose }: NewsDetailModalProps) {
  if (!news) return null;

  return (
    <Modal open={!!news} title="Detalle de la Noticia" onClose={onClose}>
      <div className="flex flex-col gap-4 text-on-surface">
        <div>
          <h3 className="text-lg font-headline font-bold text-on-surface">{news.title}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xs font-mono bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded">
              #{news.id.substring(0, 8)}
            </span>
            {news.is_fake === true && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-label font-semibold bg-error-container/40 text-error border border-error/20 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-error" /> Fake
              </span>
            )}
            {news.is_fake === false && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-label font-semibold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Real
              </span>
            )}
            {news.is_fake == null && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-label font-semibold bg-surface-variant text-on-surface-variant border border-outline-variant/30 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant" /> Pendiente
              </span>
            )}
            {news.published_at && (
              <span className="text-xs text-on-surface-variant">
                • {new Date(news.published_at).toLocaleDateString("es-ES")}
              </span>
            )}
          </div>
        </div>

        <div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant/20">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{news.content}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">Fuente</p>
            <p className="text-sm font-medium">{news.source}</p>
          </div>
          <div>
            <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">Autor</p>
            <p className="text-sm font-medium">{news.author || "—"}</p>
          </div>
          {news.url && (
            <div className="col-span-2">
              <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">URL</p>
              <a href={news.url} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline break-all">
                {news.url}
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
