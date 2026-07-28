import {
    useState,
} from "react";


import {
    Link,
    useNavigate,
} from "react-router-dom";


import Card from "../../../components/common/Card";

import Input from "../../../components/common/Input";

import Button from "../../../components/common/Button";

import Loader from "../../../components/common/Loader";


import {
    loginUser,
} from "../services/authService";


import {
    useAuthStore,
} from "../store/authStore";




export default function Login(){



    const navigate = useNavigate();



    const setToken =

        useAuthStore(

            state => state.setToken

        );



    const [email,setEmail] =

        useState("");



    const [password,setPassword] =

        useState("");



    const [error,setError] =

        useState("");



    const [loading,setLoading] =

        useState(false);







    async function handleSubmit(

        event: React.FormEvent

    ){


        event.preventDefault();


        setError("");

        setLoading(true);



        try {



            const response =

                await loginUser({

                    email,

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

                "Credenciales inválidas"

            );



        }

        finally {



            setLoading(false);



        }



    }







    return (


        <div

            className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-[#F4F8F5]
            px-4
            "

        >



            <Card>



                <div

                    className="
                    w-full
                    max-w-md
                    "

                >





                    <div

                        className="
                        text-center
                        mb-8
                        "

                    >



                        <div

                            className="
                            text-6xl
                            mb-4
                            "

                        >

                            🐶


                        </div>




                        <h1

                            className="
                            text-2xl
                            font-bold
                            text-[#1B4332]
                            "

                        >

                            FakeNewsRAGSystem


                        </h1>




                        <p

                            className="
                            text-[#5E6C61]
                            mt-2
                            "

                        >

                            Inteligencia artificial
                            contra noticias falsas


                        </p>



                    </div>









                    <form

                        onSubmit={handleSubmit}

                        className="
                        space-y-5
                        "

                    >




                        <Input

                            label="Email"

                            type="email"

                            value={email}

                            onChange={

                                e =>

                                setEmail(

                                    e.target.value

                                )

                            }

                            placeholder="
                            usuario@email.com
                            "

                        />







                        <Input

                            label="Password"

                            type="password"

                            value={password}

                            onChange={

                                e =>

                                setPassword(

                                    e.target.value

                                )

                            }

                            placeholder="
                            ********
                            "

                        />









                        {
                            error && (

                                <p

                                    className="
                                    text-red-600
                                    text-sm
                                    "

                                >

                                    {error}


                                </p>

                            )
                        }









                        {

                            loading && (

                                <Loader

                                    size="small"

                                    text="Ingresando al sistema..."

                                />

                            )

                        }









                        <Button

                            type="submit"

                            disabled={loading}

                        >



                            {

                                loading

                                ?

                                "Procesando..."

                                :

                                "Ingresar"


                            }



                        </Button>





                    </form>








                    <div

                        className="
                        text-center
                        mt-6
                        "

                    >



                        <span

                            className="
                            text-[#5E6C61]
                            "

                        >

                            ¿No tienes cuenta?


                        </span>





                        <Link

                            to="/register"

                            className="
                            ml-2
                            text-[#2D6A4F]
                            font-semibold
                            "

                        >

                            Crear cuenta


                        </Link>




                    </div>





                </div>




            </Card>




        </div>


    );

}