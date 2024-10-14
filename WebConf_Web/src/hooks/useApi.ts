import { AxiosRequestConfig } from "axios";
import useAxios from "./useAxios";
import CustomError from "../util/customError";

const useApi = <T>(endpoint: string) => {

    const axiosInstance = useAxios();

    const recuperar = () =>
        axiosInstance
            .get<T[]>(endpoint)
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
        
    const removerPorId = (id: number) =>
        axiosInstance
            .delete(endpoint + "/" + id)
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

    const recuperarPagina = (config: AxiosRequestConfig) => 
        axiosInstance
            .get<ResultadoPaginado<T>>(endpoint + "/paginacao", config)
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
    
    const cadastrar = (obj: T) =>
        axiosInstance
            .post<T>(endpoint, obj)
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    if(error.response.data.errorCode === 422) {
                        throw new CustomError(
                            error.response.data.message,
                            error.response.data.errorCode,
                            Object.values(error.response.data.map)
                        )
                    }
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
    
    const alterar = (obj: T) =>
        axiosInstance
            .put<T>(endpoint, obj)
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    if(error.response.data.errorCode === 422) {
                        throw new CustomError(
                            error.response.data.message,
                            error.response.data.errorCode,
                            Object.values(error.response.data.map)
                        )
                    }
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
    
    return { recuperar, removerPorId, recuperarPagina, cadastrar, alterar };
}

export default useApi;