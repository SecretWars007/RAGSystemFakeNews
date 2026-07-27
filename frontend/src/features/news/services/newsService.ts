import api from "../../../api/axios";

import type {
    News
} from "../../../types/news";



export async function getNews()
: Promise<News[]> {


    const response =
        await api.get(
            "/news"
        );


    return response.data;

}



export async function createNews(
    data: Partial<News>
): Promise<News> {


    const response =
        await api.post(
            "/news",
            data
        );


    return response.data;

}



export async function deleteNews(
    id:string
):Promise<void>{


    await api.delete(
        `/news/${id}`
    );

}