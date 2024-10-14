import { useQuery } from "@tanstack/react-query";
import useApiEvento from "./useApiEvento";

const useEventosPorSlugDoCategoria = (slug?: string) => {
    const { recuperarEventosPorSlugDoCategoria } = useApiEvento();

    return useQuery({
        queryKey: slug ? ["eventos", "categoria", slug] : ["eventos"],
        queryFn: () => recuperarEventosPorSlugDoCategoria(slug),
        staleTime: 7 * 24 * 60 * 60 * 1000,
        keepPreviousData: true,
    });
};

export default useEventosPorSlugDoCategoria;