import {
    Link,
} from "react-router-dom";


import {
    useAuthStore,
} from "./features/auth/store/authStore";



export default function App(){


    const logout =
        useAuthStore(
            state=>state.logout
        );



    return (

        <div>


            <h1>
                FakeNewsRAGSystem
            </h1>


            <nav>


                <Link to="/dashboard">
                    Dashboard
                </Link>


                {" | "}


                <Link to="/news">
                    Noticias
                </Link>


                {" | "}


                <Link to="/rag">
                    RAG
                </Link>


                {" | "}


                <Link to="/login">
                    Login
                </Link>


                {" | "}


                <button
                    onClick={logout}
                >

                    Logout

                </button>


            </nav>


        </div>

    );

}