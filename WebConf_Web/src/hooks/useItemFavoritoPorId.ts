import { useQuery } from "@tanstack/react-query";
import useApiItemFavorito from "./useApiItemFavorito";

const useRecuperarItemFavoritoPorId = (id: number) => {
    const recuperarItemFavoritoPorId = useApiItemFavorito();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["itemDeFavoritos", id],
        queryFn: () => recuperarItemFavoritoPorId(id),
        staleTime: 7 * 24 * 60 * 60 * 1000,
        keepPreviousData: true,
    });

    return { data, isLoading, error, refetch};
};

export default useRecuperarItemFavoritoPorId;