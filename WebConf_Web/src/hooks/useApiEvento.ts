import { AxiosRequestConfig } from "axios";
import Evento from "../interfaces/evento";
import { URL_EVENTOS } from "../util/constants";
import CustomError from "../util/customError";
import useAxios from "./useAxios";

const useApiEvento = () => {
    
    const axiosInstance = useAxios();

    const recuperarEventoPorId = (id?: number) =>
        axiosInstance
        .get<Evento>(URL_EVENTOS + "/" + id)
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

    const recuperarEventosPorSlugDoCategoria = (slug?: string) =>
        axiosInstance
            .get<Evento[]>(URL_EVENTOS + (slug ? "/categoria/" + slug : ""))
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode
                    )
                } else if (error.request) {
                    throw error;
                } else {
                    throw error;
                }
            })

    const recuperarEventosPaginadosPorSlugDoCategoria = (config: AxiosRequestConfig) =>
        axiosInstance
            .get<ResultadoPaginado<Evento>>(URL_EVENTOS + "/categoria/paginacao", config)
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode
                    )
                } else if (error.request) {
                    throw error;
                } else {
                    throw error;
                }
            })

    return { recuperarEventoPorId, recuperarEventosPorSlugDoCategoria, recuperarEventosPaginadosPorSlugDoCategoria };
}

export default useApiEvento;