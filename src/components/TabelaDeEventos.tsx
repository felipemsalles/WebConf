/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from "dayjs";
import Evento from "../interfaces/evento";
import useEventosPaginados from "../hooks/useEventosPaginados";
import useEventoStore from "../store/eventoStore";
import useRemoverEvento from "../hooks/useRemoverEvento";
import { Link } from "react-router-dom";

const TabelasDeEventos = () => {

    const pagina = useEventoStore(s => s.pagina);
    const tamanho = useEventoStore(s => s.tamanho);
    const nome = useEventoStore(s => s.nome);

    const setPagina = useEventoStore(s => s.setPagina);
    const setEventoSelecionado = useEventoStore(s => s.setEventoSelecionado);

    const tratarRemocaoDeEvento = (id: number) => {
        removerEvento(id);
        setPagina(0);
    };

    const tratarEventoSelecionado = (evento: Evento) => setEventoSelecionado(evento);

    const {
        data: eventoRemovido,
        mutate: removerEvento,
        isLoading: removendo,
        error: erroRemocao,
    } = useRemoverEvento();

    const {
        data: eventosPaginados,
        isLoading,
        error
    } = useEventosPaginados({ pagina, tamanho, nome });

    if(isLoading) return <h6>Carregando...</h6>

    if(error) throw error;
    if(erroRemocao) throw erroRemocao;

    const eventos = eventosPaginados!.itens;

    return (
        <table className="table table-responsive table-bordered table-sm">
            <thead>
                <tr>
                    <th className="align-middle text-center" style={{backgroundColor: "#f0f0f2", color: "#011826"}}>ID</th>
                    <th className="align-middle text-center" style={{backgroundColor: "#f0f0f2", color: "#011826"}}>Nome</th>
                    <th className="align-middle text-center" style={{backgroundColor: "#f0f0f2", color: "#011826"}}>Status</th>
                    <th className="align-middle text-center" style={{backgroundColor: "#f0f0f2", color: "#011826"}}>Gênero</th>
                    <th className="align-middle text-center" style={{backgroundColor: "#f0f0f2", color: "#011826"}}>Edições</th>
                    <th className="align-middle text-center" style={{backgroundColor: "#f0f0f2", color: "#011826"}}>Coordenador</th>
                    <th className="align-middle text-center" style={{backgroundColor: "#f0f0f2", color: "#011826"}}>Organização</th>
                    <th className="align-middle text-center" style={{backgroundColor: "#f0f0f2", color: "#011826"}}>Data do Evento</th>
                    <th className="align-middle text-center" style={{backgroundColor: "#f0f0f2", color: "#011826"}}>Data de Encerramento</th>
                </tr>
            </thead>
            <tbody>
                {eventos.map((evento) => (
                    
                    <tr key={evento.id}>
                        <td width="5%" className="align-midle text-center py-3">
                            {evento.id}
                        </td>
                        <td width="20%" className="align-midle text-center py-3">
                            <Link to={`/evento/${evento.id}`} className="text-decoration-none fw-bold" style={{ color: "#366273" }}>
                                {evento.nome}
                            </Link>
                            
                        </td>
                        <td width="10%" className="align-midle text-center py-3">
                            {evento.status}
                        </td>
                        <td width="10%" className="align-midle text-center py-3">
                            {evento.categoria.nome}
                        </td>
                        <td width="5%" className="align-midle text-center py-3">
                            {evento.qtdEdicoes}
                        </td>
                        <td width="15%" className="align-midle text-center py-3">
                            {evento.coordenador}
                        </td>
                        <td width="10%" className="align-midle text-center py-3">
                            {evento.organizacao}
                        </td>
                        <td width="10%" className="align-midle text-center py-3">
                            {dayjs(evento.dataEvento).format("DD/MM/YYYY")}
                        </td>
                        <td width="10%" className="align-midle text-center py-3">
                            {(dayjs(evento.dataEncerramento).isSame(dayjs(), 'day')
                                ? '--/--/----'
                                : dayjs(evento.dataEncerramento).format("DD/MM/YYYY"))
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TabelasDeEventos;
