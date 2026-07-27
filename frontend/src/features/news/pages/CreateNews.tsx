import {
    useState,
} from "react";


import {
    createNews,
} from "../services/newsService";



export default function CreateNews(){


    const [
        title,
        setTitle
    ] = useState("");



    const [
        content,
        setContent
    ] = useState("");



    async function handleSubmit(
        e:React.FormEvent
    ){


        e.preventDefault();


        await createNews({

            title,

            content,

            source:
            "Frontend",

        });



        alert(
            "Noticia creada"
        );


    }



    return (

        <form
            onSubmit={
                handleSubmit
            }
        >


            <h1>
                Crear noticia
            </h1>


            <input

                placeholder="Título"

                value={title}

                onChange={
                    e=>
                    setTitle(
                        e.target.value
                    )
                }

            />


            <textarea

                placeholder="Contenido"

                value={content}

                onChange={
                    e=>
                    setContent(
                        e.target.value
                    )
                }

            />


            <button>

                Guardar

            </button>


        </form>

    );

}