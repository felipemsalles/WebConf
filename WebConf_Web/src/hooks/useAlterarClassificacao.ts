import { useMutation, useQueryClient } from "@tanstack/react-query";
import ItemDeFavorito from "../interfaces/itemDeFavorito";
import { URL_ITEM_FAVORITOS } from "../util/constants";
import useApi from "./useApi";

const useAlteraClassificacao = () => {
    const { alterar } =useApi<ItemDeFavorito>(URL_ITEM_FAVORITOS);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemDeFavorito: ItemDeFavorito) => alterar(itemDeFavorito),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["itemDeFavoritos"],
            });
        },
    });
};

export default useAlteraClassificacao;