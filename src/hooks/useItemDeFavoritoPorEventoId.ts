import { useQuery} from "@tanstack/react-query";
import useApiItemFavorito from "./useApiItemFavorito";

const useItemDeFavoritoPorEventoId = (eventoId?: number) => {
    const { recuperarItemFavoritoPorEventoId } = useApiItemFavorito();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: eventoId ? ["itemFavorito", "evento", eventoId] : ["itemFavorito"],
        queryFn: () => recuperarItemFavoritoPorEventoId(eventoId),
        staleTime: 7 * 24 * 60 * 60 * 1000,
        keepPreviousData: true,
    });

    return { data, isLoading, error, refetch };
};

export default useItemDeFavoritoPorEventoId;