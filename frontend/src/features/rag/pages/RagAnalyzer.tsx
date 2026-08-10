import { useState } from "react";

import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
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
        <div className="space-y-6">
            <Card>
                <h1 className="text-2xl font-bold text-[#1B4332]">Verificar una afirmación</h1>
                <p className="mt-2 text-[#5E6C61]">
                    El sistema consulta primero el modelo local y la base de conocimiento.
                </p>
            </Card>

            <Card title="Afirmación a verificar" description="Ejemplo: Dicen que el dólar bajó a 2 Bs.">
                <div className="flex flex-col gap-4">
                    <textarea
                        className="min-h-32 rounded-lg border p-3"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Escribe la noticia o afirmación..."
                    />
                    <Button onClick={handleAnalyze} disabled={loading || query.trim().length < 10}>
                        {loading ? "Analizando..." : "Analizar afirmación"}
                    </Button>
                </div>
            </Card>

            {error && <Card><p className="text-red-600">{error}</p></Card>}
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
