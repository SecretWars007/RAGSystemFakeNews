import type { News } from "../../../types/news";


interface Props {

    news: News;

}


export default function NewsCard(
    {
        news
    }: Props
) {


    return (

        <article>


            <h3>
                {news.title}
            </h3>


            <p>
                {news.content}
            </p>


            <small>

                Fuente:
                {" "}
                {news.source}

            </small>


            {
                news.is_fake !== undefined &&
                (
                    <p>

                        Clasificación:

                        {" "}

                        {
                            news.is_fake
                            ? "FAKE"
                            : "REAL"
                        }

                    </p>
                )
            }


        </article>

    );

}