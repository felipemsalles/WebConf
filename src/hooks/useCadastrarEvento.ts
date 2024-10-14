import { useMutation, useQueryClient } from "@tanstack/react-query";
import Evento from "../interfaces/evento";
import { URL_EVENTOS } from "../util/constants";
import useApi from "./useApi";

const useCadastrarEvento = () => {
    const { cadastrar } = useApi<Evento>(URL_EVENTOS);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (evento: Evento) => cadastrar(evento),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["eventos"],
            });
        },
    });
};

export default useCadastrarEvento;