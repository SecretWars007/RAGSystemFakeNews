import {
    Bell,
} from "lucide-react";


import {
    useAuthStore,
} from "../../../features/auth/store/authStore";



export default function Header(){



    const token =

        useAuthStore(

            state => state.token

        );





    return (



        <header


            className="

            h-20

            bg-white

            border-b

            border-[#D8F3DC]

            flex

            items-center

            justify-between

            px-8

            "


        >





            <div>



                <h2


                    className="

                    text-xl

                    font-semibold

                    text-[#1B4332]

                    "


                >


                    Sistema Inteligente

                    de Detección de Noticias Falsas



                </h2>






                <p


                    className="

                    text-sm

                    text-[#5E6C61]

                    "


                >


                    RAG + IA Generativa + pgvector



                </p>




            </div>









            <div


                className="

                flex

                items-center

                gap-6

                "


            >





                <button


                    type="button"


                    className="

                    relative

                    text-[#2D6A4F]

                    hover:text-[#40916C]

                    transition

                    "


                >



                    <Bell

                        size={22}

                    />



                </button>









                <div


                    className="

                    flex

                    items-center

                    gap-3

                    "


                >





                    <div


                        className="

                        w-10

                        h-10

                        rounded-full

                        bg-[#40916C]

                        flex

                        items-center

                        justify-center

                        text-white

                        "


                    >


                        🐶



                    </div>







                    <div>




                        <p


                            className="

                            text-sm

                            font-semibold

                            text-[#1B4332]

                            "


                        >


                            Usuario



                        </p>







                        <span


                            className="

                            text-xs

                            text-[#5E6C61]

                            "


                        >



                            {

                                token

                                ?

                                "Conectado"

                                :

                                "Invitado"


                            }





                        </span>






                    </div>






                </div>






            </div>





        </header>



    );

}