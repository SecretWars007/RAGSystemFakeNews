import {
    useEffect,
    useState,
} from "react";


import type {
    News
} from "../../../types/news";


import {
    getNews,
    deleteNews,
} from "../services/newsService";


import NewsCard from "../components/NewsCard";



export default function NewsList(){


    const [
        news,
        setNews
    ] = useState<News[]>([]);



    async function loadNews(){


        const data =
            await getNews();


        setNews(data);

    }



    async function removeNews(
        id:string
    ){


        await deleteNews(id);


        await loadNews();

    }



    useEffect(

        ()=>{

            let active = true;

            void getNews().then(
                (data) => {
                    if (active) {
                        setNews(data);
                    }
                }
            );

            return () => {
                active = false;
            };

        },

        []

    );



    return (

        <section>


            <h1>
                Noticias
            </h1>



            {
                news.map(

                    item=>(

                        <div
                            key={
                                item.id
                            }
                        >


                            <NewsCard
                                news={
                                    item
                                }
                            />


                            <button

                                onClick={
                                    ()=>removeNews(
                                        item.id
                                    )
                                }

                            >

                                Eliminar

                            </button>


                        </div>

                    )

                )
            }


        </section>

    );

}
