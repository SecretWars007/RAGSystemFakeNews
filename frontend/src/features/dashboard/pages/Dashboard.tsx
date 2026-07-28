import {
    Newspaper,
    BrainCircuit,
    ShieldCheck,
    Users,
} from "lucide-react";


import WelcomeCard from "../components/WelcomeCard";


import SystemStatus from "../components/SystemStatus";


import QuickActions from "../components/QuickActions";


import StatCard from "../components/StatCard";



export default function Dashboard(){



    return (

        <div

            className="
            space-y-8
            "

        >



            <WelcomeCard />





            <div

                className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-6
                "

            >



                <StatCard

                    title="Noticias"

                    value="1,250"

                    description="Registradas"

                    icon={
                        <Newspaper />
                    }

                />




                <StatCard

                    title="Análisis RAG"

                    value="870"

                    description="Procesados"

                    icon={
                        <BrainCircuit />
                    }

                />




                <StatCard

                    title="Noticias falsas"

                    value="340"

                    description="Detectadas"

                    icon={
                        <ShieldCheck />
                    }

                />




                <StatCard

                    title="Usuarios"

                    value="25"

                    description="Activos"

                    icon={
                        <Users />
                    }

                />



            </div>





            <div

                className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
                "

            >


                <QuickActions />


                <SystemStatus />


            </div>



        </div>

    );

}