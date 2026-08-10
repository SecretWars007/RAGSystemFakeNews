import Card from "../../../components/common/Card";

import Badge from "../../../components/common/Badge";

import type {
    BadgeVariant,
} from "../../../components/common/Badge";
import { useEffect, useState } from "react";
import api from "../../../api/axios";



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

    const [knowledge, setKnowledge] = useState<{
        documents: number;
        embeddings: number;
        pending_refreshes: number;
    } | null>(null);

    useEffect(() => {
        let active = true;
        void api.get("/knowledge/status").then((response) => {
            if (active) {
                setKnowledge(response.data);
            }
        }).catch(() => undefined);
        return () => {
            active = false;
        };
    }, []);



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

                {knowledge && (
                    <>
                        <div className="flex justify-between items-center">
                            <span className="text-[#1B4332] font-medium">Base de conocimiento</span>
                            <Badge variant="info">{knowledge.documents} documentos</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#1B4332] font-medium">Embeddings</span>
                            <Badge variant="info">{knowledge.embeddings} indexados</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#1B4332] font-medium">Actualizaciones</span>
                            <Badge variant={knowledge.pending_refreshes ? "warning" : "success"}>
                                {knowledge.pending_refreshes ? `${knowledge.pending_refreshes} pendientes` : "Al día"}
                            </Badge>
                        </div>
                    </>
                )}


            </div>


        </Card>

    );

}
