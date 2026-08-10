import Card from "../../../components/common/Card";


import Badge from "../../../components/common/Badge";


import ConfidenceScore from "./ConfidenceScore";



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
    evidence?: { title: string; source: string; url?: string | null; similarity?: number | null }[];
    knowledgeRefresh?: "queued" | "already_queued";


}



export default function AnalysisResult({

    analysis,

    score,

    status,

    similarNews = [],

    label,
    reason,
    decisionSource,
    evidence = [],
    knowledgeRefresh,

}: AnalysisResultProps) {



    return (


        <div

            className="
            space-y-6
            "

        >



            <Card>


                <div

                    className="
                    flex
                    justify-between
                    items-center
                    "

                >


                    <h2

                        className="
                        text-xl
                        font-bold
                        text-[#1B4332]
                        "

                    >

                        Resultado del análisis RAG


                    </h2>



                    <Badge

                        variant={
                            status === "completed"
                            ?
                            "success"
                            :
                            "warning"
                        }

                    >

                        {status}


                    </Badge>



                </div>




            </Card>





            <Card

                title="Análisis generado por IA"

                description="
                Resultado producido por Gemini mediante RAG
                "

            >

                {label && <p className="mb-3 font-semibold text-[#1B4332]">Veredicto: {label}</p>}

                {reason && <p className="mb-3 text-[#374151]">{reason}</p>}

                {decisionSource && <p className="mb-3 text-sm text-[#5E6C61]">Origen: {decisionSource}</p>}



                <p

                    className="
                    text-[#374151]
                    leading-relaxed
                    "

                >

                    {
                        reason
                            ? "El resultado estructurado se muestra arriba con su evidencia."
                            : analysis || "Sin análisis disponible"
                    }


                </p>



            </Card>

            {knowledgeRefresh && (
                <Card title="Actualización de conocimiento">
                    <p className="text-sm text-[#374151]">
                        {knowledgeRefresh === "queued"
                            ? "La consulta fue encolada para buscar evidencia nueva en fuentes confiables."
                            : "Ya existe una actualización pendiente para esta consulta."}
                    </p>
                </Card>
            )}

            {evidence.length > 0 && (
                <Card title="Evidencia utilizada">
                    <ul className="space-y-2 text-sm text-[#374151]">
                        {evidence.map((item, index) => (
                            <li key={`${item.title}-${index}`}>
                                <span className="font-semibold">{item.title}</span> — {item.source}
                                {item.url && <> · <a className="text-blue-700 underline" href={item.url} target="_blank" rel="noreferrer">Fuente</a></>}
                            </li>
                        ))}
                    </ul>
                </Card>
            )}





            <Card

                title="Confianza"

            >



                <ConfidenceScore

                    score={score}

                />



            </Card>






            {

                similarNews.length > 0 && (


                    <Card

                        title="Noticias relacionadas"

                        description="
                        Documentos recuperados mediante pgvector
                        "

                    >



                        <div

                            className="
                            space-y-3
                            "

                        >



                            {
                                similarNews.map(

                                    item => (


                                        <div

                                            key={
                                                item.id
                                            }

                                            className="
                                            p-4
                                            rounded-lg
                                            bg-[#F4F8F5]
                                            "

                                        >


                                            <h3

                                                className="
                                                font-semibold
                                                text-[#1B4332]
                                                "

                                            >

                                                {
                                                    item.title
                                                }


                                            </h3>



                                            <p

                                                className="
                                                text-sm
                                                text-[#5E6C61]
                                                "

                                            >

                                                Fuente:

                                                {" "}

                                                {
                                                    item.source
                                                }


                                            </p>



                                        </div>


                                    )

                                )

                            }


                        </div>



                    </Card>


                )


            }



        </div>


    );

}
