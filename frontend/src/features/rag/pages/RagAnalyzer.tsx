import {
    useState,
} from "react";


import {
    analyzeNews,
} from "../services/ragService";


import AnalysisResult from "../components/AnalysisResult";


import type {
    RagAnalysisResponse,
} from "../../../types/rag";



export default function RagAnalyzer(){


    const [
        newsId,
        setNewsId
    ] = useState("");



    const [
        result,
        setResult
    ] = useState<RagAnalysisResponse | null>(
        null
    );



    const [
        loading,
        setLoading
    ] = useState(false);



    async function executeAnalysis(){


        try {


            setLoading(true);



            const response =
                await analyzeNews(
                    newsId
                );


            setResult(
                response
            );


        }
        finally {


            setLoading(false);

        }

    }



    return (

        <section>


            <h1>
                Fake News Analyzer
            </h1>



            <input

                placeholder="News UUID"

                value={newsId}

                onChange={
                    e =>
                    setNewsId(
                        e.target.value
                    )
                }

            />



            <button

                onClick={
                    executeAnalysis
                }

            >

                Analizar

            </button>



            {
                loading &&
                <p>
                    Analizando con IA...
                </p>
            }



            {
                result &&
                (
                    <AnalysisResult
                        result={result}
                    />
                )
            }


        </section>

    );

}