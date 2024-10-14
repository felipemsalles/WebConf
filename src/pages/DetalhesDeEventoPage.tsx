import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import useItemDeFavoritoPorEventoId from "../hooks/useItemDeFavoritoPorEventoId";
import useRecuperarEventosPorId from "../hooks/useEventoPorId";
import useRemoverEvento from "../hooks/useRemoverEvento";
import useRemoveItemDeFavorito from "../hooks/useRemoverItemDeFavorito";
import CardDeDetalhesDeEvento from "../components/CardDeDetalheDeEvento";

const DetalhesDeEventoPage = () => {

    const { id } = useParams();
    const eventoId = Number(id);
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        error,
        refetch: refetchEvento,
    } = useRecuperarEventosPorId(eventoId);

    const {
        data: itemDeFavorito,
        refetch: refetchItemDeFavorito,
    } = useItemDeFavoritoPorEventoId(eventoId);

    const {
        mutate: removerEvento,
        error: erroRemocao,
    } = useRemoverEvento();

    const {
        mutate: removerItemFavorito,
        error: erroRemocaoFavorito,
    } = useRemoveItemDeFavorito();

    const tratarRemocaoDeItemFavorito = async (id: number) => {
        removerItemFavorito(id);
    }

    const [eventoRemovido, setEventoRemovido] = useState(false);
    const [tempoRestante, setTempoRestante] = useState(5);

    useEffect(() => {
        if (eventoRemovido && tempoRestante > 0) {
          const intervalId = setInterval(() => {
            setTempoRestante((prevTempo) => prevTempo - 1);
          }, 1000);
    
          return () => clearInterval(intervalId);
        } else if (tempoRestante === 0) {
          navigate("/");
        }
        refetchEvento();
        refetchItemDeFavorito();
      }, [eventoRemovido, tempoRestante, navigate, refetchEvento, refetchItemDeFavorito]);

      const tratarRemocaoDeEvento = async (id: number) => {
        try {
            if (itemDeFavorito){
                if (itemDeFavorito.evento.id === id) {
                    await tratarRemocaoDeItemFavorito(itemDeFavorito.id!);
                }
                removerEvento(id);
                setEventoRemovido(true);
            } else {
                removerEvento(id);
                setEventoRemovido(true);
            }
        } catch (error) {
            console.error('Error in tratarRemocaoDeEvento:', error);
        }
    };
    
    const evento = data!;

    const handleAlterarClick = () => {
        navigate("/cadastrar-evento", { state: { evento } });
    };
    
    if (isLoading) return <h6>Carregando...</h6>

    if (error) throw error;

    if (erroRemocao) throw erroRemocao;

    if (erroRemocaoFavorito) throw erroRemocaoFavorito;

    return (
        <div className="d-flex flex-column align-items-center py-0 relative">
            {eventoRemovido && (
                <div className="alert alert-success" role="alert">
                    O evento foi removido com sucesso! Redirecionando em {tempoRestante} segundo(s)...
                </div>
            )}
            <CardDeDetalhesDeEvento
                id={evento.id!}
                imagem={evento.imagem}
                nome={evento.nome}
                descricao={evento.descricao}
                organizacao={evento.organizacao}
                coordenador={evento.coordenador}
                status={evento.status}
                categoria={evento.categoria.nome}
                edicoes={evento.qtdEdicoes}
                dataEvento={evento.dataEvento}
                dataEncerramento={evento.dataEncerramento}
                footer={
                    <div className="d-flex col gap-4 justify-content-center">
                        <button 
                            onClick={handleAlterarClick}
                            id="botao" 
                            type="submit" 
                            className="btn btn-primary btn-lg w-25"
                            disabled={eventoRemovido}
                        >
                            <div className="d-flex col gap-2 fs-5 align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faFloppyDisk} />
                                <span>Alterar</span>
                            </div>
                        </button>

                        <button
                            onClick={() => tratarRemocaoDeEvento(evento.id!)}
                            id="botao"
                            type="button"
                            className="btn btn-danger btn-lg w-25"
                            disabled={eventoRemovido}
                        >
                            <div className="d-flex col gap-2 fs-5 align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faXmark} />
                                <span>Remover</span>
                            </div>
                        </button>
                    </div>
                }
            />

        </div>
    );
};

export default DetalhesDeEventoPage;