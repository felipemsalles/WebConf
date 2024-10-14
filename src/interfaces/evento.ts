import Categoria from "./categoria";

interface Evento {
    id?: number;
    nome: string;
    descricao: string;
    imagem: string;
    organizacao: string;
    coordenador: string;
    categoria: Categoria;
    status: string;
    qtdEdicoes: number;
    dataEvento: Date;
    dataEncerramento: Date;
}

export default Evento;