import { Navigate, useRoutes } from "react-router-dom"
import { MainLayout } from "./components"
import { AuthPage, MainPage } from "./pages"

export const useRoute = () => {
    return useRoutes([
        {path: "/", element: <MainLayout />, children: [
            { path: "", element: <MainPage /> },
        ]},
        { path: "/auth", element: <AuthPage /> },
        { path: "*", element: <Navigate to="/" /> }
    ])
}