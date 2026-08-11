import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnalysisResult from "../components/AnalysisResult";
import RagLoader from "../components/RagLoader";
import { analyzeQuery, type RagAnalysisResponse } from "../services/ragService";

const EXAMPLES = [
  "El dólar bajó a 2 Bs.",
  "El gobierno anuncia bono universal",
  "La vacuna causa enfermedades",
  "El presidente renunció al cargo",
  "Bolivia tiene la mejor economía de Latinoamérica",
];

const HISTORY_KEY = "tiko_rag_history";

function loadHistory(): string[] {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]"); }
  catch { return []; }
}

function saveHistory(q: string) {
  const prev = loadHistory().filter((h) => h !== q);
  localStorage.setItem(HISTORY_KEY, JSON.stringify([q, ...prev].slice(0, 5)));
}

export default function RagAnalyzer() {
  const location = useLocation();
  const [query, setQuery] = useState((location.state as { query?: string })?.query ?? "");
  const [result, setResult] = useState<RagAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>(loadHistory);

  // If navigated with state query, auto-populate
  useEffect(() => {
    const stateQuery = (location.state as { query?: string })?.query;
    if (stateQuery) setQuery(stateQuery);
  }, [location.state]);

  async function handleAnalyze() {
    const q = query.trim();
    if (q.length < 10) {
      setError("Escribe una afirmación de al menos 10 caracteres.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await analyzeQuery(q);
      setResult(res);
      saveHistory(q);
      setHistory(loadHistory());
    } catch {
      setError("No se pudo completar el análisis. Verifica la conexión con el backend.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") void handleAnalyze();
  }

  const charCount = query.trim().length;
  const isReady = charCount >= 10;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">
          Verificar Afirmación
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          El sistema consulta el modelo local y la base RAG para determinar la veracidad de una afirmación.
        </p>
      </div>

      {/* Input card */}
      <div className="glass-panel rounded-2xl p-5 md:p-6 space-y-4">
        <label className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">
          Afirmación a verificar
        </label>

        {/* Textarea */}
        <div className="relative">
          <textarea
            className={`w-full bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/50
              rounded-xl px-4 py-3 text-sm font-body resize-none h-36
              border transition-all outline-none
              ${isReady
                ? "border-primary/40 focus:border-primary focus:ring-1 focus:ring-primary/30"
                : "border-outline-variant/40 focus:border-outline-variant focus:ring-1 focus:ring-outline-variant/20"
              }`}
            placeholder="Escribe la noticia o afirmación que deseas verificar... (Ctrl+Enter para analizar)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className={`absolute bottom-2.5 right-3 text-[10px] font-label font-semibold
            ${charCount < 10 ? "text-on-surface-variant/50" : "text-primary"}`}
          >
            {charCount} chars
          </div>
        </div>

        {/* Example chips */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-on-surface-variant font-label self-center">Ejemplos:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setQuery(ex)}
              className="px-3 py-1 rounded-full bg-surface-container-highest hover:bg-surface-bright text-xs font-label text-on-surface-variant hover:text-primary transition-all border border-outline-variant/20 hover:border-primary/30"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1 border-t border-outline-variant/20">
            <span className="text-xs text-on-surface-variant font-label self-center flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">history</span>
              Recientes:
            </span>
            {history.map((h) => (
              <button
                key={h}
                onClick={() => setQuery(h)}
                className="px-3 py-1 rounded-full bg-surface-variant text-xs font-label text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all max-w-[180px] truncate"
              >
                {h}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-sm text-error px-3 py-2 rounded-lg bg-error-container/20 border border-error/20">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading || !isReady}
            className="shimmer-btn flex items-center gap-2 px-6 py-2.5 rounded-xl font-label font-semibold text-sm
              bg-gradient-to-r from-brand-emerald to-primary text-on-primary
              shadow-lg shadow-primary/20 hover:opacity-90 transition-all
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
            ) : (
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                manage_search
              </span>
            )}
            {loading ? "Analizando..." : "Analizar afirmación"}
          </button>
        </div>
      </div>

      {/* Loader / Result */}
      {loading && <RagLoader />}
      {result && !loading && (
        <AnalysisResult
          analysis={result.analysis}
          score={result.score}
          status={result.status}
          similarNews={result.similar_news}
          label={result.label}
          reason={result.reason}
          decisionSource={result.decision_source}
          evidence={result.evidence}
          knowledgeRefresh={result.knowledge_refresh}
          query={query}
        />
      )}
    </div>
  );
}
