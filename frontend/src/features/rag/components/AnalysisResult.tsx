import type { RagAnalysisResponse } from "../../../types/rag";


interface Props {

    result: RagAnalysisResponse;

}


export default function AnalysisResult(
    {
        result
    }: Props
){

    return (

        <section>

            <h2>
                Resultado del análisis
            </h2>


            <p>
                Estado:
                {" "}
                {result.status}
            </p>


            <p>
                Score:
                {" "}
                {result.score}
            </p>


            <h3>
                Análisis IA
            </h3>


            <pre>

                {result.analysis}

            </pre>


        </section>

    );

}