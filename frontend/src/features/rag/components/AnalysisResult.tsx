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


}



export default function AnalysisResult({

    analysis,

    score,

    status,

    similarNews = [],

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



                <p

                    className="
                    text-[#374151]
                    leading-relaxed
                    "

                >

                    {
                        analysis ||
                        "Sin análisis disponible"
                    }


                </p>



            </Card>





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