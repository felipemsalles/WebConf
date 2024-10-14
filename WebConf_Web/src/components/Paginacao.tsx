import useEventosPaginados from "../hooks/useEventosPaginados";
import useEventoStore from "../store/eventoStore";

const Paginacao = () => {

    const pagina = useEventoStore(s => s.pagina);
    const tamanho = useEventoStore(s => s.tamanho);
    const nome = useEventoStore(s => s.nome);

    const setPagina = useEventoStore(s => s.setPagina);

    const tratarPaginaSelecionada = (page: number) => setPagina(page);

    const {
        data: eventosPaginados,
        isLoading,
        error,
    } = useEventosPaginados({ pagina, tamanho, nome });

    if (isLoading) return <h6>Carregando...</h6>

    if (error) throw error;

    const totalDePaginas = eventosPaginados!.totalDePaginas;

    const arrayDePaginas = [];

    if (totalDePaginas < 2) return null;

    for (let i = 0; i < totalDePaginas; i++) {
        arrayDePaginas.push(
            <li key={i} className={pagina === i ? "page-item active" : "page-item"} aria-current="page">
                <a onClick={() => tratarPaginaSelecionada(i)} className="page-link">
                    {i + 1}
                </a>
            </li>
        );
    }

    return (
        <nav aria-label="Paginacao">
            <ul className="pagination">
                <li className={pagina === 0 ? "page-item disabled" : "page-item"}>
                    <a onClick={() => tratarPaginaSelecionada(pagina - 1)} className="page-link">Anterior</a>
                </li>
                {arrayDePaginas}
                <li className={pagina === totalDePaginas - 1 ? "page-item disabled" : "page-item"}>
                    <a onClick={() => tratarPaginaSelecionada(pagina + 1)} className="page-link">
                        Próxima
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Paginacao;
