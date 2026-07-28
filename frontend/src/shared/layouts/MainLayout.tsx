import {
    Outlet,
} from "react-router-dom";


import Sidebar from "./Sidebar";

import Header from "./Header";

import Footer from "./Footer";



export default function MainLayout(){



    return (

        <div

            className="
            flex
            min-h-screen
            bg-[#F4F8F5]
            "

        >


            <Sidebar />



            <div

                className="
                flex
                flex-col
                flex-1
                "

            >


                <Header />



                <main

                    className="
                    flex-1
                    p-8
                    "

                >

                    <Outlet />


                </main>




                <Footer />



            </div>



        </div>

    );

}