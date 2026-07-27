import api from "../../../api/axios";

import type {
    News
} from "../../../types/news";



export async function getNews()
:Promise<News[]>{


    const response =
        await api.get(
            "/news"
        );


    return response.data;

}