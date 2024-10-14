import { useQuery } from "@tanstack/react-query";
import ItemDeFavorito from "../interfaces/itemDeFavorito";
import { URL_ITEM_FAVORITOS } from "../util/constants";
import useApi from "./useApi";

const useItemDeFavoritos = () => {
    const { recuperar } = useApi<ItemDeFavorito>(URL_ITEM_FAVORITOS);

    return useQuery({
        queryKey: ["itemDeFavoritos"],
        queryFn: () => recuperar(),
        staleTime: 7 * 24 * 60 * 60 * 1000,
        keepPreviousData: true,
    });
}

export default useItemDeFavoritos;