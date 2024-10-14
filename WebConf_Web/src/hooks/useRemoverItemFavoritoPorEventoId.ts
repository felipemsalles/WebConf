import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiItemFavorito from "./useApiItemFavorito";

const useRemoverItemFavoritoPorEventoId = () => {
    const { removerItemFavoritoPorEventoId } = useApiItemFavorito();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (eventoId: number) => removerItemFavoritoPorEventoId(eventoId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["itemDeFavoritos"],
            });
        },
    });
}

export default useRemoverItemFavoritoPorEventoId;