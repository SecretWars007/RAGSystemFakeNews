import api from "../../../api/axios";



export interface LoginRequest {


    email: string;


    password: string;


}



export interface LoginResponse {


    access_token: string;


    token_type: string;


}



export interface RegisterRequest {


    email: string;


    password: string;


}





export async function loginUser(

    data: LoginRequest

):

Promise<LoginResponse> {


    const response = await api.post(

        "/users/login",

        data

    );


    return response.data;


}






export async function registerUser(

    data: RegisterRequest

):

Promise<void> {



    await api.post(

        "/users/register",

        data

    );


}





/*
    Alias de compatibilidad.
    Mantiene funcionando Register.tsx
    mientras migramos nombres internos.
*/

export const register = registerUser;