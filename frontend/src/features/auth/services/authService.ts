import api from "../../../api/axios";

import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
} from "../../../types/auth";



export async function login(
    data: LoginRequest,
): Promise<AuthResponse>{


    const response =
        await api.post(
            "/users/login",
            data,
        );


    return response.data;

}



export async function register(
    data:RegisterRequest,
){


    const response =
        await api.post(
            "/users/register",
            data,
        );


    return response.data;

}