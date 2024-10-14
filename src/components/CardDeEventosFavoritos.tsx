import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
    id: number;
    imagem: string;
    nome: string;
    organizacao: string;
    coordenador: string;
    status: string;
    edicoes: number;
    footer: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CardDeEventosFavoritos = ({id, imagem, nome, organizacao, coordenador, status, edicoes, footer}: Props) => {
    return (
        <div className="card border-3 mb-5" style={{borderColor: "#011826"}}>
            <div className="card-header border-2 text-center" style={{backgroundColor: "#f0f0f2", borderColor: "#011826"}}>
                <Link to={`/evento/${id}`} className="text-decoration-none fw-bold fs-5" style={{ color: "#011826" }}>
                    {nome}
                </Link>
                
            </div>
            <div className="d-flex flex-row p-1">
                <img src={imagem} className="card-img" style={{width: "40%", height: "50%"}} />
                <div className="card-body d-flex flex-column row-gap-2">
                    <span className="card-text fw-bolder">Organização: <span className="fw-normal">{organizacao}</span></span>
                    <span className="card-text fw-bolder">Coordenador: <span className="fw-normal">{coordenador}</span></span>
                    <span className="card-text fw-bolder">Status: <span className="fw-normal">{status}</span></span>
                    <span className="card-text fw-bolder">Edições: <span className="fw-normal">{edicoes}</span></span>
                </div>
            </div>
            <div className="p-1">{footer}</div>
        </div>
    );
};

export default CardDeEventosFavoritos;