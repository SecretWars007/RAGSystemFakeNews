import {
    createBrowserRouter,
} from "react-router-dom";


import App from "../App";


import Login from "../features/auth/pages/Login";

import Register from "../features/auth/pages/Register";


import Dashboard from "../features/dashboard/pages/Dashboard";


import NewsList from "../features/news/pages/NewsList";

import CreateNews from "../features/news/pages/CreateNews";


import RagAnalyzer from "../features/rag/pages/RagAnalyzer";


import ProtectedRoute from "../core/security/ProtectedRoute";



export const router =
createBrowserRouter([


    {

        path:"/",

        element:<App/>,

    },


    {

        path:"/login",

        element:<Login/>,

    },


    {

        path:"/register",

        element:<Register/>,

    },


    {

        path:"/dashboard",

        element:

        <ProtectedRoute>

            <Dashboard/>

        </ProtectedRoute>

    },


    {

        path:"/news",

        element:

        <ProtectedRoute>

            <NewsList/>

        </ProtectedRoute>

    },


    {

        path:"/news/create",

        element:

        <ProtectedRoute>

            <CreateNews/>

        </ProtectedRoute>

    },


    {

        path:"/rag",

        element:

        <ProtectedRoute>

            <RagAnalyzer/>

        </ProtectedRoute>

    },


]);