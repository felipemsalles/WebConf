import dayjs from "dayjs";
import { ReactNode } from "react";

interface Props {
    id: number;
    imagem: string;
    nome: string;
    descricao: string;
    organizacao: string;
    coordenador: string;
    status: string;
    categoria: string;
    edicoes: number;
    dataEvento: Date;
    dataEncerramento: Date;
    footer: ReactNode;
}

const CardDeDetalhesDeEvento = ({id, imagem, nome, descricao, organizacao, coordenador, status, categoria, edicoes, dataEvento, dataEncerramento, footer}: Props) => {
    const isDataEncerramentoHoje = dayjs(dataEncerramento).isSame(dayjs(), 'day');

    return(
        id ? 
            <div className="card border-4" style={{ backgroundColor: "#f0f0f2", borderColor: "#011826", width: "100%"}}>
                <div className="d-flex flex-row p-2">
                    <img src={imagem} className="card-img" style={{width: "300px", height: "100%"}} />

                    <div className="card-body d-flex flex-column mx-2 my-2">
                        <div className="d-flex flex-row justify-content-evenly mb-3">
                            <div className="d-flex flex-column row-gap-2">
                                <span className="card-text fs-5 fw-bolder">Nome: <span className="fw-normal fs-5">{nome}</span></span>
                                <span className="card-text fs-5 fw-bolder">Categoria: <span className="fw-normal fs-5">{categoria}</span></span>
                                <span className="card-text fs-5 fw-bolder">Status: <span className="fw-normal fs-5">{status}</span></span>
                                <span className="card-text fs-5 fw-bolder">Edições: <span className="fw-normal fs-5">{edicoes}</span></span>
                            </div>

                            <div className="d-flex flex-column row-gap-2">
                                <span className="card-text fs-5 fw-bolder">Organização: <span className="fw-normal fs-5">{organizacao}</span></span>
                                <span className="card-text fs-5 fw-bolder">Coordenador: <span className="fw-normal fs-5">{coordenador}</span></span>
                                <span className="card-text fs-5 fw-bolder">Data do Evento: <span className="fw-normal fs-5">{dayjs(dataEvento).format("DD/MM/YYYY")}</span></span>
                                <span className="card-text fs-5 fw-bolder">Data de Encerramento: <span className="fw-normal fs-5">
                                    {isDataEncerramentoHoje ? '--/--/----' : dayjs(dataEncerramento).format("DD/MM/YYYY")}</span></span>
                            </div>
                        </div>
                        <p className="text-center mb-4 fw-bolder" style={{fontSize: "17px"}}>{descricao}</p>
                        <div>{footer}</div>
                    </div>
                </div>
            </div>
        : 
        <div>não existe</div>
    );
};

export default CardDeDetalhesDeEvento;