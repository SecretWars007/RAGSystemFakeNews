import {
    useState,
} from "react";


import {
    register,
} from "../services/authService";



export default function Register(){


    const [username,setUsername]=
        useState("");


    const [email,setEmail]=
        useState("");


    const [password,setPassword]=
        useState("");



    async function handleSubmit(
        event:React.FormEvent
    ){

        event.preventDefault();


        await register({

            username,

            email,

            password,

        });


        alert(
            "Usuario registrado"
        );

    }



    return (

        <div>


            <h1>
                Registro
            </h1>


            <form
                onSubmit={handleSubmit}
            >


                <input

                    placeholder="Usuario"

                    value={username}

                    onChange={
                        e=>
                        setUsername(
                            e.target.value
                        )
                    }

                />


                <input

                    placeholder="Email"

                    value={email}

                    onChange={
                        e=>
                        setEmail(
                            e.target.value
                        )
                    }

                />



                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={
                        e=>
                        setPassword(
                            e.target.value
                        )
                    }

                />



                <button>

                    Crear cuenta

                </button>


            </form>


        </div>

    );

}