import {
    NavLink,
} from "react-router-dom";


import {
    LayoutDashboard,
    Newspaper,
    BrainCircuit,
    Database,
    LogOut,
} from "lucide-react";


import {
    useAuthStore,
} from "../../../features/auth/store/authStore";



const menu = [


    {
        name: "Dashboard",

        path: "/dashboard",

        icon: LayoutDashboard,

    },



    {
        name: "Noticias",

        path: "/news",

        icon: Newspaper,

    },



    {
        name: "Análisis RAG",

        path: "/rag",

        icon: BrainCircuit,

    },


    {
        name: "Fuentes",

        path: "/sources",

        icon: Database,

    },

];





export default function Sidebar(){



    const logout =

        useAuthStore(

            state => state.logout

        );





    return (


        <aside

            className="
            w-64
            min-h-screen
            bg-[#1B4332]
            text-white
            flex
            flex-col
            "

        >





            <div

                className="
                p-6
                text-center
                "

            >



                <div

                    className="
                    text-5xl
                    "

                >

                    🐶


                </div>





                <h1

                    className="
                    mt-3
                    font-bold
                    text-lg
                    "

                >

                    FakeNewsRAGSystem


                </h1>





                <span

                    className="
                    text-sm
                    text-[#D8F3DC]
                    "

                >

                    Tiko AI


                </span>




            </div>







            <nav

                className="
                flex-1
                px-4
                "

            >



                {

                    menu.map(

                        item => {


                            const Icon =

                                item.icon;



                            return (


                                <NavLink


                                    key={
                                        item.path
                                    }


                                    to={
                                        item.path
                                    }



                                    className={

                                        ({
                                            isActive

                                        }) =>


                                        `

                                        flex

                                        items-center

                                        gap-3

                                        px-4

                                        py-3

                                        rounded-xl

                                        mb-2

                                        transition


                                        ${

                                            isActive

                                            ?

                                            "bg-[#40916C]"

                                            :

                                            "hover:bg-[#2D6A4F]"

                                        }


                                        `

                                    }


                                >



                                    <Icon

                                        size={20}

                                    />





                                    <span>


                                        {
                                            item.name
                                        }


                                    </span>





                                </NavLink>


                            );


                        }

                    )


                }





            </nav>







            <button


                type="button"


                onClick={logout}


                className="

                flex

                items-center

                gap-3

                p-5

                hover:bg-[#2D6A4F]

                transition

                "


            >



                <LogOut

                    size={20}

                />



                Cerrar sesión




            </button>





        </aside>


    );

}
