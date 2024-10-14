import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelasDeEventos from "../components/TabelaDeEventos";


const ListaDeEventosPage = () => {
    return (
        <>
            <Pesquisa />
            <TabelasDeEventos />
            <Paginacao />
        </>
    );
};

export default ListaDeEventosPage;