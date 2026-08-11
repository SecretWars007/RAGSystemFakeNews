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
}

export default function AnalysisResult({
  analysis,

  score,

  label,

  reason,

  decisionSource,

  evidence = [],

  knowledgeRefresh,
}: AnalysisResultProps) {
  const isFalse = label === "FALSO";

  const bgClass = isFalse
    ? "bg-error-dim border-error/20"
    : "bg-primary-container/20 border-primary/20";

  const iconClass = isFalse
    ? "dangerous text-white"
    : "check_circle text-primary";

  const titleClass = isFalse ? "text-white" : "text-primary";

  const textClass = isFalse ? "text-white/90" : "text-on-surface-variant";

  const watermarkIcon = isFalse ? "gpp_bad" : "gpp_good";

  return (
    <div className="mt-8">
      <h3 className="text-xl font-headline font-semibold text-on-surface mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          analytics
        </span>{" "}
        Resultados del Análisis
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className={`lg:col-span-2 ${bgClass} rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center shadow-xl border`}
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-9xl text-white">
              {watermarkIcon}
            </span>
          </div>

          <div className="relative z-10 space-y-4">
            {label ? (
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-3xl ${iconClass}`}
                >
                  {iconClass.split(" ")[0]}
                </span>

                <h4
                  className={`${titleClass} text-5xl font-display font-black tracking-widest uppercase`}
                >
                  {label}
                </h4>
              </div>
            ) : (
              <h4 className={`${titleClass} text-3xl font-display font-bold`}>
                Análisis Generado
              </h4>
            )}

            <div className="inline-block bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full border border-white/10">
              <span className="text-white text-sm font-semibold">
                Confianza: {Math.round(score * 100)}%
              </span>
            </div>

            <p
              className={`${textClass} text-lg leading-relaxed max-w-xl font-medium mt-4`}
            >
              {reason ? reason : analysis || "Sin análisis disponible"}
            </p>

            {decisionSource && (
              <p className="text-sm font-label text-white/70">
                Origen: {decisionSource}
              </p>
            )}

            {knowledgeRefresh && (
              <p className="text-sm font-label text-white/70 mt-2">
                {knowledgeRefresh === "queued"
                  ? "Actualización de conocimiento encolada."
                  : "Actualización de conocimiento ya en progreso."}
              </p>
            )}
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl border border-surface-container-highest p-6 flex flex-col shadow-lg">
          <h4 className="text-sm font-label text-on-surface-variant mb-4 uppercase tracking-wider">
            Confianza del Análisis
          </h4>

          <div className="flex-1 flex items-center justify-center relative w-full h-48">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-display font-black text-primary">
                {Math.round(score * 100)}%
              </span>
            </div>

            <svg
              viewBox="0 0 100 100"
              className="w-full h-full transform -rotate-90"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-surface-container-highest"
              />

              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-primary"
                strokeDasharray={`${Math.round(score * 283)} 283`}
              />
            </svg>
          </div>

          <div className="text-center mt-2">
            <p className="text-xs text-on-surface-variant">
              Basado en la relevancia semántica de los documentos recuperados.
            </p>
          </div>
        </div>

        {evidence.length > 0 && (
          <div className="lg:col-span-3 bg-surface-container rounded-2xl border border-surface-container-highest p-6 shadow-lg">
            <h4 className="text-lg font-headline font-semibold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-dim text-xl">
                source
              </span>{" "}
              Evidencia Utilizada (Top K)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evidence.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-high rounded-xl p-5 border border-outline-variant/30 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="text-on-surface font-semibold text-base group-hover:text-primary transition-colors">
                      {item.title}
                    </h5>

                    {item.url && (
                      <a
                        className="text-on-surface-variant hover:text-primary"
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="material-symbols-outlined text-sm">
                          open_in_new
                        </span>
                      </a>
                    )}
                  </div>

                  <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">
                    {item.source}
                  </p>

                  {item.similarity !== undefined &&
                    item.similarity !== null && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-label">
                          <span className="text-on-surface-variant">
                            Similitud Coseno
                          </span>

                          <span className="text-primary font-mono">
                            {item.similarity.toFixed(2)}
                          </span>
                        </div>

                        <div className="w-full bg-surface-container-highest rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full"
                            style={{
                              width: `${Math.round(item.similarity * 100)}%`,
                            }}
                          ></div>
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
