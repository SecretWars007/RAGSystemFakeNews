import Card from "../../../components/common/Card";

import Badge from "../../../components/common/Badge";

import type {
    BadgeVariant,
} from "../../../components/common/Badge";



const services: {

    name: string;

    status: string;

    variant: BadgeVariant;

}[] = [


    {
        name: "Backend API",
        status: "Online",
        variant: "success",
    },


    {
        name: "PostgreSQL",
        status: "Online",
        variant: "success",
    },


    {
        name: "pgvector",
        status: "Enabled",
        variant: "success",
    },


    {
        name: "Gemini AI",
        status: "Ready",
        variant: "info",
    },


    {
        name: "RAG Engine",
        status: "Active",
        variant: "success",
    },

];



export default function SystemStatus(){



    return (

        <Card

            title="Estado del sistema"

            description="
            Componentes principales de la plataforma
            "

        >


            <div

                className="
                space-y-4
                "

            >


                {
                    services.map(

                        service => (

                            <div

                                key={
                                    service.name
                                }

                                className="
                                flex
                                justify-between
                                items-center
                                "

                            >


                                <span

                                    className="
                                    text-[#1B4332]
                                    font-medium
                                    "

                                >

                                    {
                                        service.name
                                    }

                                </span>



                                <Badge

                                    variant={
                                        service.variant
                                    }

                                >

                                    {
                                        service.status
                                    }

                                </Badge>



                            </div>

                        )

                    )
                }


            </div>


        </Card>

    );

}