import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../store/userStore";
import Layout from "./Layout";

function PrivateRoutes() {
    const usuarioLogado = useUserStore(s => s.usuarioLogado);

    const location = useLocation();

    if(!usuarioLogado.id) {
        return <Navigate to="/login" state={{ from: location.pathname}} />
    }

    return <Layout />;
}

export default PrivateRoutes;