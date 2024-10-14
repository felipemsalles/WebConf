import { useMutation, useQueryClient } from "@tanstack/react-query";
import ItemDeFavorito from "../interfaces/itemDeFavorito";
import { URL_ITEM_FAVORITOS } from "../util/constants";
import useApi from "./useApi";

const useRemoveItemDeFavorito = () => {
    const { removerPorId } = useApi<ItemDeFavorito>(URL_ITEM_FAVORITOS);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => removerPorId(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["itemDeFavoritos"],
            });
        },
    });
};

export default useRemoveItemDeFavorito;