import useItemDeFavoritos from "../hooks/useItensDeFavoritos";
import useRemoveItemDeFavorito from "../hooks/useRemoverItemDeFavorito";
import CardDeEventosFavoritos from "../components/CardDeEventosFavoritos";
import ItemDeFavorito from "../interfaces/itemDeFavorito";
import useAlteraClassificacao from "../hooks/useAlterarClassificacao";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

const StyledInput = styled.input`
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    -moz-appearance: textfield;
`;

const FavoritosEventosPage = () => {
    const { data: favoritos, isLoading, error } = useItemDeFavoritos();

    const {
        mutate: removerItemFavorito,
        error: erroRemocao,
    } = useRemoveItemDeFavorito();

    const tratarRemocaoDeItemFavorito = (id: number) => {
        removerItemFavorito(id);
    }

    const {
        mutate: alterarClassificacao,
        error: errorAlterar
    } = useAlteraClassificacao();

    if (isLoading) return <h6>Carregando...</h6>;

    if (favoritos?.length === 0)
        return(
            <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: "70vh" }}>
                <h2>Lista de Favoritos Vazia!!!</h2>
                <img className="d-none d-md-block" src="./public/sademoji2.png" style={{ width: "400px" }} />
            </div>
        )

    if (error) throw error;

    if (erroRemocao) throw erroRemocao;

    if (errorAlterar) throw errorAlterar;

    return (
        <div>
            <h5 className="text-center">Favoritos de Felipe</h5>
            <div className="d-flex justify-content-center mb-3 gap-1">
                <h6 className="text-center">Média de Classificação: {favoritos!.reduce((soma, item) => soma + item.classificacao, 0) / favoritos!.length}</h6>
                <FontAwesomeIcon icon={faStar} style={{ color: "black", opacity: "0.75"}} />
            </div>
            <div className="row">
                {favoritos?.map((item) =>
                    <div key={item.id} className="col-xl-4 col-md-4 col-sm-5 col-6">
                        <CardDeEventosFavoritos
                            id={item.evento.id!}
                            imagem={item.evento.imagem}
                            nome={item.evento.nome}
                            organizacao={item.evento.organizacao}
                            coordenador={item.evento.coordenador}
                            status={item.evento.status}
                            edicoes={item.evento.qtdEdicoes}
                            footer={
                                <div className="d-flex flex-column gap-1 justify-content-center">
                                    <div className="p-5 d-flex flex-column rounded gap-0 justify-content-center align-items-center" style={{ backgroundColor: "#366273", color: "#f0f0f2", height: "5rem"}}>
                                        <span className="fs-6">Classificação:</span>
                                        <StyledInput
                                            className="d-flex gap-2 align-items-center fs-5 justify-self-center bg-transparent border-0"
                                            style={{
                                                color: "#f0f0f2",
                                                textAlign: "center",
                                                WebkitAppearance: "none",
                                                MozAppearance: "textfield",
                                                appearance: "textfield",
                                                outline: "none",
                                            }}
                                            type="number"
                                            value={item.classificacao}
                                            min={0}
                                            max={10}
                                            onChange={(e) => {
                                                let novaClassificacao = parseInt(e.target.value);
                                                if (novaClassificacao > 10) novaClassificacao = 10;
                                                const novoItemDeFavorito: ItemDeFavorito = {
                                                    ...item,
                                                    classificacao: novaClassificacao,
                                                };
                                                alterarClassificacao(novoItemDeFavorito);
                                            }}
                                        />
                                        <div className="d-flex gap-2">
                                            {Array.from({ length: item.classificacao }).map((_, index) => (
                                                <FontAwesomeIcon key={index} icon={faStar} style={{ color: "gold" }} />
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => tratarRemocaoDeItemFavorito(item.id!)}
                                        id="botao"
                                        type="button"
                                        className="btn btn-danger btn-lg w-100"
                                    >
                                        <div className="d-flex col gap-2 fs-6 align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={faXmark} />
                                            <span>Remover Favorito</span>
                                        </div>
                                    </button>
                                </div>
                            }
                        />
                    </div>
                )}
            </div>
        </div>

    )
};

export default FavoritosEventosPage;