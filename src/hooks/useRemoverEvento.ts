import { useMutation, useQueryClient } from "@tanstack/react-query";
import Evento from "../interfaces/evento";
import { URL_EVENTOS } from "../util/constants";
import useApi from "./useApi";

const useRemoverEvento = () => {
    const { removerPorId } = useApi<Evento>(URL_EVENTOS);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => removerPorId(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["eventos"],
            });
        },
    });
};

export default useRemoverEvento;