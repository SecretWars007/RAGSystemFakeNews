import {
    useState,
} from "react";

import {
    useNavigate,
    Link,
} from "react-router-dom";

import {
    login,
} from "../services/authService";

import {
    useAuthStore,
} from "../store/authStore";


export default function Login() {


    const navigate = useNavigate();


    const setToken =
        useAuthStore(
            (state) => state.setToken
        );


    const [username, setUsername] =
        useState("");


    const [password, setPassword] =
        useState("");


    const [error, setError] =
        useState("");



    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault();


        setError("");

        try {


            const response =
                await login({

                    username,

                    password,

                });



            setToken(
                response.access_token
            );


            navigate(
                "/dashboard"
            );


        }
        catch {


            setError(
                "Usuario o contraseña incorrectos"
            );


        }

    }



    return (

        <div>


            <h1>
                Login
            </h1>



            <form
                onSubmit={
                    handleSubmit
                }
            >



                <input

                    type="text"

                    placeholder="Usuario"

                    value={username}

                    onChange={
                        (e)=>
                        setUsername(
                            e.target.value
                        )
                    }

                    required

                />



                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={
                        (e)=>
                        setPassword(
                            e.target.value
                        )
                    }

                    required

                />



                <button
                    type="submit"
                >

                    Ingresar

                </button>

                <Link
                    to="/register"
                >
                    ¿No tienes cuenta? Regístrate aquí
                </Link>

            </form>



            {
                error &&
                (
                    <p>

                        {error}

                    </p>
                )
            }


        </div>

    );

}