import {
    Link,
} from "react-router-dom";


export default function QuickActions(){


    return (

        <section>


            <h2>
                Acciones rápidas
            </h2>


            <ul>


                <li>

                    <Link
                        to="/news/create"
                    >

                        Crear noticia

                    </Link>

                </li>


                <li>

                    <Link
                        to="/news"
                    >

                        Ver noticias

                    </Link>

                </li>


                <li>

                    <Link
                        to="/rag"
                    >

                        Analizar Fake News

                    </Link>

                </li>


            </ul>


        </section>

    );

}