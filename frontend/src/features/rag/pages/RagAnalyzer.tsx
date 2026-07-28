import {
    useEffect,
    useState,
} from "react";


import Card from "../../../components/common/Card";

import Button from "../../../components/common/Button";

import Loader from "../../../components/common/Loader";


import AnalysisResult from "../components/AnalysisResult";

import RagLoader from "../components/RagLoader";


import {
    getNewsForAnalysis,
    analyzeNews,
} from "../services/ragService";




interface NewsOption {


    id: string;


    title: string;


    source: string;


}






interface RagAnalysisResponse {


    news_id: string;


    status: string;


    analysis: string;


    score: number;



    similar_news?: {


        id: string;


        title: string;


        source: string;



    }[];


}








export default function RagAnalyzer(){





    const [news,setNews] =

        useState<NewsOption[]>([]);




    const [selectedNews,setSelectedNews] =

        useState("");




    const [result,setResult] =

        useState<RagAnalysisResponse | null>(null);




    const [loadingNews,setLoadingNews] =

        useState(true);




    const [loadingAnalysis,setLoadingAnalysis] =

        useState(false);




    const [error,setError] =

        useState("");









    useEffect(() => {



        async function loadNews(){



            try {



                const response =

                    await getNewsForAnalysis();




                setNews(

                    response

                );





            }

            catch {



                setError(

                    "No se pudieron cargar las noticias"

                );



            }

            finally {



                setLoadingNews(false);



            }




        }





        loadNews();





    }, []);









    async function handleAnalyze(){





        if(!selectedNews){



            setError(

                "Seleccione una noticia antes de analizar"

            );



            return;



        }






        try {



            setLoadingAnalysis(true);


            setError("");

            setResult(null);





            const response =

                await analyzeNews(

                    selectedNews

                );





            setResult(

                response

            );





        }

        catch {



            setError(

                "Error ejecutando análisis RAG"

            );



        }

        finally {



            setLoadingAnalysis(false);



        }



    }








    if(loadingNews){



        return (



            <Loader


                text="Cargando noticias para Tiko AI..."


                size="large"


            />



        );



    }









    return (





        <div

            className="
            space-y-6
            "

        >





            <Card>



                <h1


                    className="
                    text-2xl
                    font-bold
                    text-[#1B4332]
                    "


                >



                    Analizador RAG



                </h1>






                <p


                    className="
                    mt-2
                    text-[#5E6C61]
                    "


                >



                    Analiza noticias utilizando embeddings,
                    pgvector y Gemini AI.



                </p>





            </Card>










            <Card


                title="Seleccionar noticia"


                description="
                Elige una noticia para ejecutar el motor RAG
                "


            >






                {

                    news.length === 0 ? (


                        <p

                            className="
                            text-[#5E6C61]
                            "

                        >

                            No existen noticias disponibles.



                        </p>



                    )

                    :

                    (




                        <div


                            className="
                            flex
                            flex-col
                            gap-4
                            "


                        >





                            <select


                                className="
                                border
                                rounded-lg
                                p-3
                                "

                                value={selectedNews}


                                onChange={


                                    e =>

                                    setSelectedNews(

                                        e.target.value

                                    )


                                }


                            >



                                <option value="">



                                    Seleccione una noticia



                                </option>







                                {


                                    news.map(


                                        item => (



                                            <option


                                                key={item.id}


                                                value={item.id}



                                            >


                                                {item.title}

                                                {" - "}

                                                {item.source}



                                            </option>



                                        )

                                    )


                                }




                            </select>








                            <Button



                                onClick={handleAnalyze}



                                disabled={

                                    loadingAnalysis ||

                                    !selectedNews

                                }



                            >





                                {


                                    loadingAnalysis


                                    ?


                                    "Analizando..."


                                    :


                                    "Analizar con Tiko 🐾"




                                }





                            </Button>







                        </div>






                    )


                }





            </Card>









            {

                error && (



                    <Card>


                        <p

                            className="
                            text-red-600
                            "

                        >

                            {error}



                        </p>


                    </Card>



                )



            }









            {


                loadingAnalysis && (



                    <RagLoader />


                )


            }









            {


                result && !loadingAnalysis && (



                    <AnalysisResult


                        analysis={result.analysis}


                        score={result.score}


                        status={result.status}


                        similarNews={result.similar_news}


                    />



                )


            }





        </div>



    );

}