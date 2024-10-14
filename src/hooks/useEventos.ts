import { useQuery } from "@tanstack/react-query";
import Evento from "../interfaces/evento";
import axios from "axios";

const useEventos = () => useQuery({
    queryKey: ['eventos'],
    queryFn: () => axios
        .get<Evento[]>("http://localhost:8080/eventos")
        .then(res => res.data),
    staleTime: 10_000
});

export default useEventos;