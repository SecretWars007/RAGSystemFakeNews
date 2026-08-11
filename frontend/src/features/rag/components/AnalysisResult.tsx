interface SimilarNews {
  id: string;
  title: string;
  source: string;
}

interface AnalysisResultProps {
  analysis: string;
  score: number;
  status: string;
  similarNews?: SimilarNews[];
  label?: string | null;
  reason?: string | null;
  decisionSource?: string | null;
  evidence?: {
    title: string;
    source: string;
    url?: string | null;
    similarity?: number | null;
  }[];
  knowledgeRefresh?: "queued" | "already_queued";
  query?: string;
}

const FAKE_LABEL   = "FALSO";

function ScoreGauge({ score }: { score: number }) {
  const pct   = Math.round(score * 100);
  const circ  = 2 * Math.PI * 45; // r=45
  const dash  = (pct / 100) * circ;

  const color = pct >= 70 ? "#4edea3" : pct >= 40 ? "#ffb3af" : "#ff6b6b";

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#283832" strokeWidth="7" />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            style={{ transition: "stroke-dasharray 1s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-headline font-black" style={{ color }}>{pct}%</span>
          <span className="text-[9px] font-label text-on-surface-variant uppercase tracking-wider">confianza</span>
        </div>
      </div>
      <p className="text-xs text-on-surface-variant text-center max-w-[140px]">
        Relevancia semántica de evidencias recuperadas
      </p>
    </div>
  );
}

export default function AnalysisResult({
  analysis,
  score,
  label,
  reason,
  decisionSource,
  evidence = [],
  knowledgeRefresh,
  query,
}: AnalysisResultProps) {
  const isFake = label === FAKE_LABEL;

  const bgClass    = isFake
    ? "bg-gradient-to-br from-error-container/60 to-error-container/30 border-error/25"
    : "bg-gradient-to-br from-primary/15 to-primary/5 border-primary/20";

  const labelColor = isFake ? "text-error" : "text-primary";
  const textColor  = isFake ? "text-on-error-container" : "text-on-surface-variant";

  const iconName   = isFake ? "gpp_bad" : "gpp_good";
  const iconColor  = isFake ? "text-error" : "text-primary";

  function copyResult() {
    const text = `Afirmación: ${query ?? ""}\nVeredicto: ${label ?? "—"}\nConfianza: ${Math.round(score * 100)}%\nAnálisis: ${reason ?? analysis}`;
    void navigator.clipboard.writeText(text);
  }

  return (
    <div className="space-y-5 animate-slide-up">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            analytics
          </span>
          Resultados del Análisis
        </h3>
        <button
          onClick={copyResult}
          className="flex items-center gap-1.5 text-xs font-label text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">content_copy</span>
          Copiar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Verdict card */}
        <div className={`lg:col-span-2 ${bgClass} glass-panel rounded-2xl p-7 relative overflow-hidden flex flex-col justify-between border shadow-xl`}>
          {/* Watermark */}
          <div className="absolute -right-4 -top-4 opacity-[0.06]">
            <span
              className="material-symbols-outlined text-[160px]"
              style={{ fontVariationSettings: "'FILL' 1", color: isFake ? "#ff6b6b" : "#4edea3" }}
            >
              {iconName}
            </span>
          </div>

          <div className="relative z-10 space-y-4">
            {/* Label + icon */}
            <div className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined text-4xl ${iconColor}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {iconName}
              </span>
              <div>
                {label ? (
                  <h4 className={`font-headline font-black text-4xl md:text-5xl tracking-wider uppercase ${labelColor}`}>
                    {label}
                  </h4>
                ) : (
                  <h4 className="font-headline font-bold text-3xl text-on-surface">Análisis Generado</h4>
                )}
              </div>
            </div>

            {/* Confidence pill */}
            <div className="inline-flex items-center gap-2 bg-black/25 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full" style={{ background: isFake ? "#ff6b6b" : "#4edea3" }} />
              <span className="text-on-surface text-sm font-label font-semibold">
                Confianza: {Math.round(score * 100)}%
              </span>
            </div>

            {/* Reason */}
            <p className={`${textColor} text-base leading-relaxed font-body max-w-xl`}>
              {reason ?? analysis ?? "Sin análisis disponible."}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-2">
              {decisionSource && (
                <p className="text-xs font-label text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Origen: {decisionSource}
                </p>
              )}
              {knowledgeRefresh && (
                <p className="text-xs font-label text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">sync</span>
                  {knowledgeRefresh === "queued"
                    ? "Actualización de conocimiento encolada"
                    : "Actualización ya en progreso"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Score gauge */}
        <div className="glass-panel rounded-2xl border border-outline-variant/20 p-6 flex flex-col shadow-lg">
          <h4 className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider mb-4">
            Confianza del análisis
          </h4>
          <div className="flex-1">
            <ScoreGauge score={score} />
          </div>
        </div>

        {/* Evidence */}
        {evidence.length > 0 && (
          <div className="lg:col-span-3 glass-panel rounded-2xl border border-outline-variant/20 p-6 shadow-lg">
            <h4 className="text-base font-headline font-semibold text-on-surface mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                source
              </span>
              Evidencia Utilizada — Top {evidence.length}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evidence.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-high rounded-xl p-4 border border-outline-variant/20 hover:border-primary/40 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h5 className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h5>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-on-surface-variant hover:text-primary transition-colors shrink-0"
                      >
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-on-surface-variant mb-3 line-clamp-1">{item.source}</p>

                  {item.similarity != null && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-label">
                        <span className="text-on-surface-variant uppercase tracking-wider">Similitud coseno</span>
                        <span className="text-primary font-mono font-semibold">{item.similarity.toFixed(3)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-brand-emerald rounded-full transition-all duration-700"
                          style={{ width: `${Math.round(item.similarity * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
