export default function RagLoader(){


    const steps = [


        "Generando embeddings con Gemini AI",


        "Consultando base vectorial pgvector",


        "Recuperando contexto relevante",


        "Ejecutando análisis RAG",


        "Generando resultado final",


    ];





    return (



        <div


            className="

            flex

            flex-col

            items-center

            justify-center

            py-12

            "

        >






            <div


                className="

                text-7xl

                animate-bounce

                "

            >



                🐾




            </div>









            <h2


                className="

                mt-4

                text-xl

                font-bold

                text-[#1B4332]

                "

            >



                Tiko está analizando...




            </h2>








            <p


                className="

                text-[#5E6C61]

                mt-2

                text-center

                "

            >



                Motor inteligente de detección de noticias falsas




            </p>









            <div


                className="

                mt-6

                w-full

                max-w-md

                space-y-3

                "

            >






                {


                    steps.map((step,index)=>(



                        <div


                            key={step}


                            className="

                            flex

                            items-center

                            gap-3

                            bg-[#F4F8F5]

                            rounded-lg

                            p-3

                            border

                            border-[#D8F3DC]

                            "


                        >





                            <span


                                className="

                                w-6

                                h-6

                                rounded-full

                                bg-[#40916C]

                                text-white

                                flex

                                items-center

                                justify-center

                                text-xs

                                font-bold

                                "

                            >



                                {index + 1}



                            </span>








                            <span


                                className="

                                text-sm

                                text-[#1B4332]

                                "

                            >



                                {step}




                            </span>







                        </div>




                    ))



                }






            </div>






        </div>


    );


}