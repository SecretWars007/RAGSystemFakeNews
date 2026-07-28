import {
    Link,
} from "react-router-dom";


import Table from "../../../components/common/Table";


import Badge from "../../../components/common/Badge";


import Button from "../../../components/common/Button";


import type {
    TableColumn,
} from "../../../components/common/Table";



interface NewsItem {


    id: string;


    title: string;


    source: string;


    status?: string;


}



interface NewsTableProps {


    news: NewsItem[];


}



export default function NewsTable({

    news,

}: NewsTableProps) {



    const columns: TableColumn<NewsItem>[] = [



        {

            key: "title",

            header: "Título",

        },



        {

            key: "source",

            header: "Fuente",

        },



        {

            key: "status",

            header: "Estado",


            render: (

                value,

            ) => (


                <Badge

                    variant={

                        value === "Analizada"

                        ?

                        "success"

                        :

                        "warning"

                    }

                >

                    {
                        value ?? "Pendiente"
                    }


                </Badge>


            ),

        },



        {

            key: "id",

            header: "Acciones",


            render: (

                value,

            ) => (


                <Link

                    to={`/rag?news=${String(value)}`}

                >


                    <Button

                        variant="outline"

                    >

                        Analizar RAG


                    </Button>


                </Link>


            ),

        },



    ];



    return (


        <Table

            columns={columns}

            data={news}

            emptyMessage="
            No existen noticias registradas
            "

        />


    );

}