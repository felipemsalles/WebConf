import { create } from "zustand";
import User from "../interfaces/user";

interface UserStore {
    usuarioLogado: User;
    tentouLogar: boolean;

    setUsuarioLogado: (user: User) => void;
    setTentouLogar: (valor: boolean) => void;
}

const useUserStore = create<UserStore>((set) => ({
    usuarioLogado: {} as User,
    tentouLogar: false,

    setUsuarioLogado: (user: User) => set(() => ({usuarioLogado: user})),
    setTentouLogar: (valor: boolean) => set(() => ({tentouLogar: valor}))
}));

export default useUserStore;