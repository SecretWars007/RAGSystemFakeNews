import api from "../../../api/axios";

import type {
    RagAnalysisResponse
} from "../../../types/rag";



export async function analyzeNews(

    newsId:string

):Promise<RagAnalysisResponse>{


    const response =
        await api.post(
            `/rag/analyze/${newsId}`
        );


    return response.data;

}