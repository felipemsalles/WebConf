import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout';
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import CardsDeEventosPage from "../pages/CardsEventoPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoutes from "./PrivateRoutes";
import CadastroDeEventosPage from "../pages/CadastroEventoPage";
import ListaEventosPage from "../pages/ListaEventosPage";
import DetalhesDeEventoPage from "../pages/DetalhesDeEventoPage";
import FavoritosEventosPage from "../pages/FavoritosEventosPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage />,
                children: [
                    {
                        path: ":slug?",
                        element: <CardsDeEventosPage />
                    }
                ]
            },
            { path: "evento/:id?", element: <DetalhesDeEventoPage /> },
            { path: "lista-eventos", element: <ListaEventosPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "cadastrar-evento", element: <CadastroDeEventosPage />}
        ] 
    },
    {
        path: "/",
        element: <PrivateRoutes />,
        errorElement: <ErrorPage />,
        children: [
            { path: "favoritos-eventos", element: <FavoritosEventosPage />},
        ]
    }
]);

export default router;