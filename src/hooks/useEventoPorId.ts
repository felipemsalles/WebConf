import { useQuery } from "@tanstack/react-query";
import useApiEvento from "./useApiEvento";

const useRecuperarEventosPorId = (id: number) => {
    const { recuperarEventoPorId } = useApiEvento();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["evento", id],
        queryFn: () => recuperarEventoPorId(id),
        staleTime: 7 * 24 * 60 * 60 * 1000,
        keepPreviousData: true,
    });

    return { data, isLoading, error, refetch };
};

export default useRecuperarEventosPorId;
