import { useQuery } from "@tanstack/react-query";
import Evento from "../interfaces/evento";
import { URL_EVENTOS } from "../util/constants";
import useApi from "./useApi";

interface QueryString {
    pagina: number;
    tamanho: number;
    nome: string;
}

const useEventosPaginados = (query: QueryString) => {
    const { recuperarPagina } = useApi<Evento>(URL_EVENTOS);

    return useQuery({
        queryKey: ["eventos", "paginacao", query],
        queryFn: () =>
            recuperarPagina({
                params: {
                    ...query,
                },
            }),
        staleTime: 10_000,
        keepPreviousData: true,
    });
};

export default useEventosPaginados;