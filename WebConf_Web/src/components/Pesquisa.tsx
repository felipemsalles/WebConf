import { useRef } from "react";
import useEventoStore from "../store/eventoStore";

const Pesquisa = () => {

    const nome = useEventoStore(s => s.nome);
    const setNome = useEventoStore(s => s.setNome);
    const setPagina = useEventoStore(s => s.setPagina);

    const tratarNomePesquisado = (nome: string) => {
        setNome(nome);
        setPagina(0);
    };

    const nomeRef = useRef<HTMLInputElement>(null);

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            tratarNomePesquisado(nomeRef.current!.value);
        }}
        className="d-flex mb-3"
        >
            <input defaultValue={nome} ref={nomeRef} type="text" className="form-control form-control-lg me-2" placeholder="Pesquisar..." />
            <button type="submit" className="btn btn-success btn-sm">Pesquisar</button>
        </form>
    );
};

export default Pesquisa;