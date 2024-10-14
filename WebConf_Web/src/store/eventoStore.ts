import { create } from "zustand";
import  Evento from "../interfaces/evento";

interface EventoStore {
    pagina: number;
    nome: string;
    eventoSelecionado: Evento;
    tamanho: number;

    setPagina: (pagina: number) => void;
    setNome: (nome: string) => void;
    setEventoSelecionado: (eventoSelecionado: Evento) => void;
    limparEventoSelecionado: () => void;
}

const useEventoStore = create<EventoStore>((set) => ({
    pagina: 0,
    nome: "",
    eventoSelecionado: {} as Evento,
    tamanho: 5,

    setPagina: (pagina: number) => set(() => ({pagina: pagina})),
    setNome: (nome: string) => set(() => ({nome: nome})),
    setEventoSelecionado: (eventoSelecionado: Evento) => set(() => ({eventoSelecionado: eventoSelecionado})),
    limparEventoSelecionado: () => set(() => ({ eventoSelecionado: {} as Evento })),
}));

export default useEventoStore;