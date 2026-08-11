import { Navigate, createBrowserRouter } from "react-router-dom";

import Login from "../features/auth/pages/Login";

import Register from "../features/auth/pages/Register";

import Dashboard from "../features/dashboard/pages/Dashboard";
import Sources from "../features/dashboard/pages/Sources";

import NewsList from "../features/news/pages/NewsList";

import CreateNews from "../features/news/pages/CreateNews";

import RagAnalyzer from "../features/rag/pages/RagAnalyzer";

import MainLayout from "../shared/layouts/MainLayout";

import ProtectedRoute from "../core/security/ProtectedRoute";

import NotFound from "../shared/pages/NotFound";

export const router = createBrowserRouter([
  /*
    ===========================
    PUBLIC ROUTES
    ===========================
    */

  {
    path: "/login",

    element: <Login />,
  },

  {
    path: "/register",

    element: <Register />,
  },

  /*
    ===========================
    PRIVATE ROUTES
    ===========================
    */

  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "/",

        element: (
          <Navigate
            to="/dashboard"

            replace
          />
        ),
      },

      {
        path: "/dashboard",

        element: <Dashboard />,
      },

      {
        path: "/sources",
        element: <Sources />,
      },

      {
        path: "/news",

        element: <NewsList />,
      },

      {
        path: "/news/create",

        element: <CreateNews />,
      },

      {
        path: "/rag",

        element: <RagAnalyzer />,
      },
    ],
  },

  /*
    Ruta fallback
    */

  {
    path: "*",
    element: <NotFound />,
  },
]);
