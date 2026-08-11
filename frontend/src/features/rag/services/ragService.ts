import api from "../../../api/axios";

export interface RagAnalysisResponse {
  news_id: string;

  status: string;

  analysis: string;

  score: number;

  similar_news?: {
    id: string;

    title: string;

    source: string;
  }[];

  label?: string | null;
  reason?: string | null;
  decision_source?: string | null;
  evidence?: {
    title: string;
    source: string;
    url?: string | null;
    similarity?: number | null;
  }[];

  knowledge_refresh?: "queued" | "already_queued";
}

export interface NewsOption {
  id: string;

  title: string;

  source: string;
}

export async function getNewsForAnalysis(): Promise<NewsOption[]> {
  const response = await api.get("/news");

  return response.data;
}

export async function analyzeNews(
  newsId: string,
): Promise<RagAnalysisResponse> {
  const response = await api.post(`/rag/analyze/${newsId}`);

  return response.data;
}

export async function analyzeQuery(
  query: string,
): Promise<RagAnalysisResponse> {
  const response = await api.post("/rag/analyze", { query });
  return response.data;
}
