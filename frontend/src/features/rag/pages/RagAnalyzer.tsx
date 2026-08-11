import { useState } from "react";
import AnalysisResult from "../components/AnalysisResult";
import RagLoader from "../components/RagLoader";
import { analyzeQuery, type RagAnalysisResponse } from "../services/ragService";

export default function RagAnalyzer() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<RagAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (query.trim().length < 10) {
      setError("Escribe una afirmación de al menos 10 caracteres.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      setResult(await analyzeQuery(query.trim()));
    } catch {
      setError("No se pudo completar el análisis.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-on-surface">
          Verificar una Afirmación
        </h2>
        <p className="text-on-surface-variant text-lg">
          El sistema consulta el modelo local y la base de conocimiento RAG para
          determinar la veracidad.
        </p>
      </div>

      <div className="bg-surface-container rounded-2xl border border-surface-container-highest p-6 shadow-lg">
        <div className="relative">
          <textarea
            className="w-full bg-surface-variant text-on-surface placeholder-on-surface-variant/50 border-outline-variant rounded-xl p-4 focus:ring-primary focus:border-primary resize-none h-40 font-body text-base outline-none"
            placeholder="Escribe la noticia o afirmación a verificar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setQuery("El dólar bajó a 2 Bs.")}
            className="px-4 py-1.5 rounded-full bg-surface-container-highest hover:bg-surface-bright text-xs font-medium text-on-surface-variant transition-colors border border-outline-variant/30"
          >
            El dólar bajó a 2 Bs.
          </button>
          <button
            onClick={() => setQuery("El gobierno anuncia bono universal")}
            className="px-4 py-1.5 rounded-full bg-surface-container-highest hover:bg-surface-bright text-xs font-medium text-on-surface-variant transition-colors border border-outline-variant/30"
          >
            El gobierno anuncia bono universal
          </button>
          <button
            onClick={() => setQuery("La vacuna causa enfermedades")}
            className="px-4 py-1.5 rounded-full bg-surface-container-highest hover:bg-surface-bright text-xs font-medium text-on-surface-variant transition-colors border border-outline-variant/30"
          >
            La vacuna causa enfermedades
          </button>
        </div>

        {error && <p className="text-error-dim mt-4">{error}</p>}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading || query.trim().length < 10}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-surface-dim font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
          >
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              manage_search
            </span>
            {loading ? "Analizando..." : "Analizar afirmación"}
          </button>
        </div>
      </div>

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
        />
      )}
    </div>
  );
}
