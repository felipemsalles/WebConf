import { FieldValues, useForm } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";
import { DevTool } from "@hookform/devtools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import useApi from "../hooks/useApi";
import useCategorias from "../hooks/useCategorias";
import useCadastrarEvento from "../hooks/useCadastrarEvento";
import useAlteraEvento from "../hooks/useAlterarEvento";
import Evento from "../interfaces/evento";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dataValida from "../util/dataValida";
import { URL_CATEGORIAS } from "../util/constants";
import useEventoStore from "../store/eventoStore";
import { useNavigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { recuperar } = useApi<Categoria>(URL_CATEGORIAS);
let categoriasValidos: Categoria[];

const validaCategoria = async (id: string) => {
    if (!categoriasValidos) {
        categoriasValidos = await recuperar();
    }
    const cat = categoriasValidos.find((categoria) => categoria.id === parseInt(id));
    return cat;
}
const regexData = /^[0-9]{2}|\/[0-9]{2}\/[0-9]{4}$/;
const regexImagem = /^[^\0]+\.(gif|jpg|png|bmp)$/;
const schema = z.object({
    nome: z
        .string()
        .min(1, { message: "O nome deve ser informado." })
        .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),

    descricao: z
        .string()
        .min(1, { message: "A descricao deve ser informada." }),

    imagem: z
        .string()
        .min(1, { message: "A imagem deve ser informada." })
        .regex(regexImagem, { message: "Nome de imagem inválido." }),

    organizacao: z
        .string()
        .min(1, { message: "A organização deve ser informada." })
        .min(3, { message: "A organização deve ter pelo menos 3 caracteres." }),

    coordenador: z
        .string()
        .min(1, { message: "O nome do coordenador deve ser informado." })
        .min(3, { message: "O nome do coordenador deve ter pelo menos 5 caracteres." }),

    categoria: z
        .string()
        .refine(validaCategoria, { message: "Categoria inválida." }),

    status: z
        .string()
        .min(1, { message: "O status deve ser informado." })
        .min(3, { message: "O status deve ter pelo menos 5 caracteres." }),

    qtd_edicoes: z
        .number({ invalid_type_error: "A quantidade de edições deve ser informada." })
        .min(0, { message: "A quantidade de edições deve ser maior do que zero." }),

    data_evento: z
        .string()
        .min(1, { message: "A data do evento deve ser informada." })
        .regex(regexData, { message: "Data inválida." })
        .refine(dataValida, { message: "Data inválida." }),

    data_encerramento: z
        .string()
        .min(1, { message: "A data de encerramento deve ser informada." })
        .regex(regexData, { message: "Data inválida." })
        .refine(dataValida, { message: "Data inválida." }),
});

type FormEvento = z.infer<typeof schema>;

const CadastroDeEventosForm = () => {
    const location = useLocation();
    const eventoSelecionado = useEventoStore(s => s.eventoSelecionado);
    const setEventoSelecionado = useEventoStore(s => s.setEventoSelecionado);

    const navigate = useNavigate();

    const tratarEventoSelecionado = (evento: Evento) => setEventoSelecionado(evento);

    const { mutate: cadastrarEvento, error: errorCadastrar } = useCadastrarEvento();
    const { data: categorias, error: errorCategorias } = useCategorias();
    const { mutate: alterarEvento, error: errorAlterar } = useAlteraEvento();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
        setValue,
        setFocus,
        control,
    } = useForm<FormEvento>({
        resolver: zodResolver(schema),
        mode: "onSubmit",
        defaultValues: {
            nome: "",
            descricao: "",
            imagem: "",
            organizacao: "",
            coordenador: "",
            status: "",
            data_evento: "",
            data_encerramento: "",
        },
    });

    const onSubmit = ({
        nome,
        descricao,
        imagem,
        organizacao,
        coordenador,
        categoria,
        status,
        qtd_edicoes,
        data_evento,
        data_encerramento,
    }: FieldValues) => {
        const evento: Evento = {
            nome: nome,
            descricao: descricao,
            imagem: imagem,
            organizacao: organizacao,
            coordenador: coordenador,
            categoria: { id: categoria, nome: "", slug: "" },
            status: status,
            qtdEdicoes: qtd_edicoes,
            dataEvento: new Date(
                data_evento.substring(6, 10) +
                "-" +
                data_evento.substring(3, 5) +
                "-" +
                data_evento.substring(0, 2)
            ),
            dataEncerramento: new Date(
                data_encerramento.substring(6, 10) +
                "-" +
                data_encerramento.substring(3, 5) +
                "-" +
                data_encerramento.substring(0, 2)
            ),
        };
        if (eventoSelecionado.id) {
            evento.id = eventoSelecionado.id;
            alterarEvento(evento);
        } else {
            cadastrarEvento(evento);
        }
    };

    useEffect(() => {
        setFocus("nome");
        if(location.state && location.state.evento){
            setEventoSelecionado(location.state.evento);
           if (eventoSelecionado.id) {
                reset();
                setValue("nome", eventoSelecionado.nome);
                setValue("descricao", eventoSelecionado.descricao);
                setValue("imagem", eventoSelecionado.imagem);
                setValue("organizacao", eventoSelecionado.organizacao);
                setValue("coordenador", eventoSelecionado.coordenador);
                setValue("categoria", String(eventoSelecionado.categoria.id));
                setValue("status", eventoSelecionado.status);
                setValue("qtd_edicoes", eventoSelecionado.qtdEdicoes);
                setValue("data_evento", dayjs(eventoSelecionado.dataEvento).format("DD/MM/YYYY"));
                setValue("data_encerramento", dayjs(eventoSelecionado.dataEncerramento).format("DD/MM/YYYY"));
            } 
        }
    }, [eventoSelecionado, location.state, reset, setValue, setFocus, setEventoSelecionado]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            tratarEventoSelecionado({} as Evento);
            navigate("/", {state: null});
        }
    }, [isSubmitSuccessful, tratarEventoSelecionado, navigate, reset]);

    if (errorCategorias) throw errorCategorias;
    if (errorCadastrar) throw errorCadastrar;
    if (errorAlterar) throw errorAlterar;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="row my-4">

                    <div className="col-xl">
                        <div className="form-floating">
                            <input
                                {...register("nome")}
                                type="text"
                                id="nome"
                                autoComplete="off"
                                className={
                                    errors.nome
                                        ? "form-control form-control-sm is-invalid"
                                        : "form-control form-control-sm fs-6"
                                }
                            />
                            <label htmlFor="nome" className="fw-bold py-2">Nome do Evento</label>
                            <div className="invalid-feedback">
                                {errors.nome?.message}
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3">
                        <div className="form-floating">
                            <input
                                {...register("status")}
                                type="text"
                                id="status"
                                autoComplete="off"
                                className={
                                    errors.status
                                        ? "form-control form-control-sm is-invalid"
                                        : "form-control form-control-sm fs-6"
                                }
                            />
                            <label htmlFor="status" className="fw-bold py-2">Status do Evento</label>
                            <div className="invalid-feedback">
                                {errors.status?.message}
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3">
                        <div className="form-floating">
                            <select
                                {...register("categoria")}
                                id="categoria"
                                className={
                                    errors.categoria
                                        ? "form-select is-invalid"
                                        : "form-select fs-6"
                                }
                            >
                                <option selected>Selecione uma categoria</option>
                                {categorias?.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id} className="fs-6">
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="categoria" className="py-2 fw-bold">Categoria do Evento</label>
                            <div className="invalid-feedback">{errors.categoria?.message}</div>
                        </div>
                    </div>

                </div>
                <div className="col-xl mb-4">
                    <div className="form-floating">
                        <input
                            {...register("imagem")}
                            type="text"
                            id="imagem"
                            autoComplete="off"
                            className={
                                errors.imagem
                                    ? "form-control form-control-sm is-invalid"
                                    : "form-control form-control-sm fs-6"
                            }
                        />
                        <label htmlFor="imagem" className="fw-bold py-2">URL da Imagem do Evento</label>
                        <div className="invalid-feedback">
                            {errors.imagem?.message}
                        </div>
                    </div>
                </div>

                <div className="row mb-4">

                    <div className="col-xl">
                        <div className="form-floating">
                            <input
                                {...register("qtd_edicoes", { valueAsNumber: true })}
                                type="number"
                                min="1"
                                id="qtd_edicoes"
                                autoComplete="off"
                                className={
                                    errors.qtd_edicoes
                                        ? "form-control form-control-sm is-invalid"
                                        : "form-control form-control-sm fs-6"
                                }
                            />
                            <label htmlFor="qtd_edicoes" className="fw-bold py-2">Quantidade de Edições do Evento</label>
                            <div className="invalid-feedback">
                                {errors.qtd_edicoes?.message}
                            </div>
                        </div>
                    </div>

                    <div className="col-xl">
                        <div className="form-floating">
                            <input
                                {...register("organizacao")}
                                type="text"
                                id="organizacao"
                                autoComplete="off"
                                className={
                                    errors.organizacao
                                        ? "form-control form-control-sm is-invalid"
                                        : "form-control form-control-sm fs-6"
                                }
                            />
                            <label htmlFor="organizacao" className="fw-bold py-2">Organização do Evento</label>
                            <div className="invalid-feedback">
                                {errors.organizacao?.message}
                            </div>
                        </div>
                    </div>

                    <div className="col-xl">
                        <div className="form-floating">
                            <input
                                {...register("coordenador")}
                                type="text"
                                id="coordenador"
                                autoComplete="off"
                                className={
                                    errors.coordenador
                                        ? "form-control form-control-sm is-invalid"
                                        : "form-control form-control-sm fs-6"
                                }
                            />
                            <label htmlFor="coordenador" className="fw-bold py-2">Coordenador do Evento</label>
                            <div className="invalid-feedback">
                                {errors.coordenador?.message}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-xl">
                        <div className="form-floating">
                            <input
                                {...register("data_evento")}
                                type="text"
                                id="data_evento"
                                autoComplete="off"
                                className={
                                    errors.data_evento
                                        ? "form-control form-control-sm is-invalid"
                                        : "form-control form-control-sm fs-6"
                                }
                            />
                            <label htmlFor="data_evento" className="fw-bold py-2">Data do Evento</label>
                            <div className="invalid-feedback">
                                {errors.data_evento?.message}
                            </div>
                        </div>
                    </div>

                    <div className="col-xl">
                        <div className="form-floating">
                            <input
                                {...register("data_encerramento")}
                                type="text"
                                id="data_encerramento"
                                autoComplete="off"
                                className={
                                    errors.data_encerramento
                                        ? "form-control form-control-sm is-invalid"
                                        : "form-control form-control-sm fs-6"
                                }
                            />
                            <label htmlFor="data_encerramento" className="fw-bold py-2">Data de Encerramento do Evento</label>
                            <div className="invalid-feedback">
                                {errors.data_encerramento?.message}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl mb-4">
                    <div className="form-floating">
                        <textarea
                            {...register("descricao")}
                            id="descricao"
                            autoComplete="off"
                            className={
                                errors.descricao
                                    ? "form-control form-control-sm is-invalid"
                                    : "form-control form-control-sm fs-6"
                            }
                            style={{ height: "100px" }}
                        />
                        <label htmlFor="descricao" className="fw-bold py-2">Descrição do Evento</label>
                        <div className="invalid-feedback">
                            {errors.descricao?.message}
                        </div>
                    </div>
                </div>
                <div className="d-flex col gap-4 justify-content-center mb-3">
                    <button id="botao" type="submit" className="btn btn-primary btn-lg w-25">
                        <div className="d-flex col gap-2 fs-4 align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faFloppyDisk} />
                            <span>{eventoSelecionado.id ? "Alterar" : "Cadastrar"}</span>
                        </div>
                    </button>

                    <button
                        onClick={() => {
                            reset();
                            tratarEventoSelecionado({} as Evento);
                        }}
                        id="botao"
                        type="button"
                        className="btn btn-danger btn-lg w-25"
                    >
                        <div className="d-flex col gap-2 fs-4 align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faXmark} />
                            <span>Cancelar</span>
                        </div>
                    </button>
                </div>
            </form>
            <DevTool control={control} />
        </>
    );
};

export default CadastroDeEventosForm;