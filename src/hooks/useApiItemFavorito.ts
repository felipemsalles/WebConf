import ItemDeFavorito from "../interfaces/itemDeFavorito";
import { URL_ITEM_FAVORITOS } from "../util/constants";
import CustomError from "../util/customError";
import useAxios from "./useAxios";

const useApiItemFavorito = () => {
    const axiosInstance = useAxios();

    const recuperarItemFavoritoPorId = (id?: number) =>
        axiosInstance
        .get<ItemDeFavorito>(URL_ITEM_FAVORITOS + "/" + id)
        .then((res) => res.data)
        .catch((error) => {
            if (error.response) {
            throw new CustomError(
                error.response.data.message,
                error.response.data.errorCode
            );
            } else if (error.request) {
            throw error;
            } else {
            throw error;
            }
        });

    const recuperarItemFavoritoPorEventoId = (eventoId?: number) =>
        axiosInstance
        .get<ItemDeFavorito>(URL_ITEM_FAVORITOS + "/evento/" + eventoId)
        .then((res) => res.data)
        .catch((error) => {
            if (error.response) {
            throw new CustomError(
                error.response.data.message,
                error.response.data.errorCode
            );
            } else if (error.request) {
            throw error;
            } else {
            throw error;
            }
        });

    const removerItemFavoritoPorEventoId = (eventoId?: number) =>
        axiosInstance
        .delete(URL_ITEM_FAVORITOS + "/evento/" + eventoId)
        .then((res) => res.data)
        .catch((error) => {
            if (error.response) {
            throw new CustomError(
                error.response.data.message,
                error.response.data.errorCode
            );
            } else if (error.request) {
            throw error;
            } else {
            throw error;
            }
        });

    return { recuperarItemFavoritoPorId, recuperarItemFavoritoPorEventoId, removerItemFavoritoPorEventoId};
}

export default useApiItemFavorito;