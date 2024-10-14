import { useInfiniteQuery } from "@tanstack/react-query";
import Evento from "../interfaces/evento";
import useApiEvento from "./useApiEvento";

interface QueryString {
    tamanho: number;
    slug?: string;
}

const useEventosPaginadosPorSlugDoCategoria = (query: QueryString) => {
    const { recuperarEventosPaginadosPorSlugDoCategoria } = useApiEvento();

    return useInfiniteQuery<ResultadoPaginado<Evento>>({
        queryKey: ["eventos", "categoria", "paginacao", query],
        queryFn: ({ pageParam = 0 }) =>
            recuperarEventosPaginadosPorSlugDoCategoria({
                params: {
                    pagina: pageParam,
                    tamanho: query.tamanho,
                    slugCategoria: query.slug
                },
            }),
        staleTime: 10_000,
        keepPreviousData: true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.paginaCorrente < lastPage.totalDePaginas - 1 ?
                lastPage.paginaCorrente + 1 : undefined;
        }
    });
};

export default useEventosPaginadosPorSlugDoCategoria;