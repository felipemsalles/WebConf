import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import User from "../interfaces/user";
import useUserStore from "../store/userStore";
import { useLocation, useNavigate } from "react-router-dom";

const schema = z.object({
    username: z.string().min(1, { message: "O username deve ser informado." }),
    senha: z.string().min(1, { message: "A senha deve ser informada." }),
});

type FormLogin = z.infer<typeof schema>;

const LoginForm = () => {
    const setUsuarioLogado = useUserStore((s) => s.setUsuarioLogado);
    const setTentouLogar = useUserStore((s) => s.setTentouLogar);
    const tentouLogar = useUserStore((s) => s.tentouLogar);
    const location = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
    } = useForm<FormLogin>({
        defaultValues: {
            username: "",
            senha: ""
        }
    });

    useEffect(() => {
        setFocus("username");
        setTentouLogar(false);
    }, [setFocus, setTentouLogar]);

    const onSubmit = ({ username, senha }: FieldValues) => {
        const user: User = { id: 1, username: "Felipe" };
        if (username === "felipe" && senha === "123") {
            setUsuarioLogado(user);

            if (location.state && location.state.from) {
                navigate(location.state.from);
            } else {
                navigate("/")
            }
        } else {
            setUsuarioLogado({} as User);
            setTentouLogar(true);
        }
    }

    return (
        <div className="d-flex flex-row justify-content-center align-items-center py-0" style={{ height: "75vh" }}>
            <div className="card rounded shadow">
                <div className="card-body d-flex flex-column align-items-center">
                    <div className="d-flex flex-column align-items-center py-3" >
                        <h2 className="m-0 fw-bold" style={{ color: "#366273", fontFamily: "Silkscreen" }}>Login</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex flex-column gap-1">
                                <label htmlFor="username" className="fw-light">Username</label>
                                <input
                                    {...register("username")}
                                    type="text"
                                    id="username"
                                    className={
                                        errors.username
                                            ? "form-control form-control-sm is-invalid"
                                            : "form-control form-control-sm"
                                    }
                                />
                                <div className="invalid-feedback">{errors.username?.message}</div>
                            </div>

                            <div className="d-flex flex-column gap-1">
                                <label htmlFor="senha" className="fw-light">Password</label>
                                <input
                                    {...register("senha")}
                                    type="password"
                                    id="senha"
                                    className={
                                        errors.senha
                                            ? "form-control form-control-sm is-invalid"
                                            : "form-control form-control-sm"
                                    }
                                />
                                <div className="invalid-feedback">{errors.senha?.message}</div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center py-4" style={{ height: "6.5rem" }}>
                            <button type="submit" className="w-100 btn btn-outline-success" style={{ fontFamily: "Silkscreen" }}>
                                <span className="fs-4 fw-bolder">
                                    Entrar
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                {tentouLogar && (
                    <div className="mx-3 alert alert-danger text-center fw-bold" role="alert">
                        Login Inválido!
                    </div>
                )}
            </div>
        </div>
    )
}

export default LoginForm;