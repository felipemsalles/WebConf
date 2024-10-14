import { useParams } from "react-router-dom";
import useEventosPaginadosPorSlugDoCategoria from "../hooks/useEventosPaginadosPorSlugDoCategoria";
import InfiniteScroll from "react-infinite-scroll-component";
import CardDeEventos from "../components/CardDeEventos";
import Favoritos from "../interfaces/favorito";
import ItemDeFavorito from "../interfaces/itemDeFavorito";
import Evento from "../interfaces/evento";
import useAdicionarItemFavorito from "../hooks/useAdicionarItemFavorito";
import useItemDeFavoritos from "../hooks/useItensDeFavoritos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import useAlteraClassificacao from "../hooks/useAlterarClassificacao";

const CardsDeEventosPage = () => {
    const { slug } = useParams();
    const tamanho = 6
    const { data, isLoading, error, fetchNextPage, hasNextPage } =

        useEventosPaginadosPorSlugDoCategoria({
            tamanho,
            slug,
        });

    const {
        mutate: adicionarFavorito,
        error: errorAdicionar
    } = useAdicionarItemFavorito();

    const {
        mutate: alterarClassificacao,
        error: errorAlterar
    } = useAlteraClassificacao();

    const { data: favoritos, error: errorFavoritos } = useItemDeFavoritos();

    const handlerAdicionarFavorito = (classificacao: number, evento: Evento, favorito: Favoritos) => {
        const itemDeFavorito: ItemDeFavorito = {
            classificacao: classificacao,
            evento: evento,
            favorito: favorito
        }
        adicionarFavorito(itemDeFavorito);
    }

    const isFavorito = (evento: Evento) => {
        return favoritos?.some(favorito => favorito.evento.id === evento.id);
    }

    const itemDeFavoritos = (evento: Evento) => {
        return favoritos?.find(favorito => favorito.evento.id === evento.id);
    }

    const handlerPlusClassificacao = (evento: Evento) => {
        const itemFavorito = itemDeFavoritos(evento);
        if (itemFavorito) {
            if(itemFavorito.classificacao < 10){
                const novaClassificacao = itemFavorito.classificacao + 1;
                const novoItemDeFavorito: ItemDeFavorito = {
                    ...itemFavorito,
                    classificacao: novaClassificacao,
                };
                alterarClassificacao(novoItemDeFavorito);
            }
        }
    };

    const handlerMinusClassificacao = (evento: Evento) => {
        const itemFavorito = itemDeFavoritos(evento);
        if (itemFavorito) {
            if(itemFavorito.classificacao > 0){
                const novaClassificacao = itemFavorito.classificacao - 1;
                const novoItemDeFavorito: ItemDeFavorito = {
                    ...itemFavorito,
                    classificacao: novaClassificacao,
                };
                alterarClassificacao(novoItemDeFavorito);
            }
        }
    };

    const favorito: Favoritos = {
        id: 1
    }

    if (isLoading) return <h6>Carregando...</h6>

    const getQtdEventos = data?.pages.reduce((total, page) => total + page.itens.length, 0) || 0;

    if (error) throw error;

    if (errorAdicionar) throw errorAdicionar;

    if (errorFavoritos) throw errorFavoritos;

    if (errorAlterar) throw errorAlterar;

    return (
        <InfiniteScroll
            dataLength={getQtdEventos}
            hasMore={!!hasNextPage}
            next={() => fetchNextPage()}
            loader={<h6>Carregando...</h6>}
            style={{ overflow: "visible" }}
        >

            <div className="row">
                {data?.pages.map((page) =>
                    page.itens.map((evento) => (
                        <div key={evento.id} className="col-xl-4 col-md-6 col-sm-5 col-12">
                            <CardDeEventos
                                id={evento.id!}
                                imagem={evento.imagem}
                                nome={evento.nome}
                                organizacao={evento.organizacao}
                                coordenador={evento.coordenador}
                                status={evento.status}
                                edicoes={evento.qtdEdicoes}
                                footer={
                                    isFavorito(evento) ? (
                                        <div className="d-flex col rounded gap-5 w-100 justify-content-center align-items-center" style={{ backgroundColor: "#366273", color: "#f0f0f2", height: "3rem" }}>
                                            <button
                                                id="botao"
                                                type="button"
                                                disabled={itemDeFavoritos(evento)?.classificacao === 0}
                                                onClick={() => handlerMinusClassificacao(evento)}
                                                className="btn btn-lg"
                                                style={{
                                                    color: "#ffffff",
                                                    transition: 'filter 0.3s ease',
                                                    border: "none",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.filter = 'brightness(60%)';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.filter = 'brightness(100%)';
                                                }}
                                            >
                                                <div className="d-flex col gap-2 fs-4 align-items-center justify-content-center">
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </div>
                                            </button>

                                            <div className="d-flex flex-column align-items-center">
                                                <span style={{fontSize:"15px"}}>Classificação:</span>
                                                <span className="fs-6">{itemDeFavoritos(evento)?.classificacao}</span>
                                            </div>

                                            <button
                                                id="botao"
                                                type="button"
                                                onClick={() => handlerPlusClassificacao(evento)}
                                                className="btn btn-lg"
                                                disabled={itemDeFavoritos(evento)?.classificacao === 10}
                                                style={{
                                                    color: "#ffffff",
                                                    transition: 'filter 0.3s ease',
                                                    border: "none"
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.filter = 'brightness(60%)';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.filter = 'brightness(100%)';
                                                }}
                                            >
                                                <div className="d-flex col gap-2 fs-4 align-items-center justify-content-center">
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </div>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handlerAdicionarFavorito(0, evento, favorito)}
                                            id="botao"
                                            type="button"
                                            className="btn roudend-1 w-100"
                                            style={{ backgroundColor: "#366273", color: "#f0f0f2", height: "3rem" }}
                                        >
                                            <span>Adicionar aos Favoritos</span>
                                        </button>
                                    )

                                }
                            />
                        </div>
                    ))
                )}
            </div>
        </InfiniteScroll>
    );
};

export default CardsDeEventosPage;