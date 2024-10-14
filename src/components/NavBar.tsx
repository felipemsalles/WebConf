import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPenToSquare, faTableList, faStar, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import useEventosPaginados from "../hooks/useEventosPaginados";
import useEventoStore from "../store/eventoStore";

export default function NavBar() {

    const location = useLocation();

    const pagina = useEventoStore(s => s.pagina);
    const tamanho = useEventoStore(s => s.tamanho);
    const nome = useEventoStore(s => s.nome);

    const {
        isLoading,
        error,
    } = useEventosPaginados({ pagina, tamanho, nome });

    if (isLoading) return <h6>Carregando...</h6>

    if (error) throw error;

    return (
        <>
            <div className="py-1" style={{backgroundColor: "#f0f0f2"}}>
                <div className="row">
                    <div className="col-3 d-flex align-items-center">
                        <div className="d-flex flex-column px-3 align-items-center">
                            <img className="d-none d-md-block" src="./public/logo-webconf.png" style={{ width: "80px" }} />
                            <span className="fs-6 fw-bolder" style={{ color: "#011826" }}>Webconf</span>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="py-4 d-flex flex-row column-gap-4" style={{ color: "#011826" }}>
                            <Link 
                                to="/"
                                className="d-flex flex-row column-gap-2 text-decoration-none" 
                                style={{ 
                                    color: location.pathname === '/' ? "#366273" : "#011826",
                                
                                }}
                            >
                                <FontAwesomeIcon icon={faHouse} className="fs-5"/>
                                <span className="fs-6 fw-bolder">Home</span>
                            </Link>
                            <Link 
                                to="/cadastrar-evento"
                                className="d-flex flex-row column-gap-2 text-decoration-none" 
                                style={{ 
                                    color: location.pathname === '/cadastrar-evento' ? "#366273" : "#011826",
                                
                                }}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} className="fs-5"/>
                                <span className="fs-6 fw-bolder">Cadastrar Evento</span>
                            </Link>
                            <Link 
                                to="/lista-eventos"
                                className="d-flex flex-row column-gap-2 text-decoration-none" 
                                style={{ 
                                    color: location.pathname === '/lista-eventos' ? "#366273" : "#011826",
                                
                                }}
                            >
                                <FontAwesomeIcon icon={faTableList} className="fs-5"/>
                                <span className="fs-6 fw-bolder">Lista de Eventos</span>
                            </Link>
                            <Link 
                                to="/favoritos-eventos"
                                className="d-flex flex-row column-gap-2 text-decoration-none" 
                                style={{ 
                                    color: location.pathname === '/favoritos-eventos' ? "#366273" : "#011826",
                                
                                }}
                            >
                                <FontAwesomeIcon icon={faStar} className="fs-5"/>
                                <span className="fs-6 fw-bolder">Eventos Favoritos</span>
                            </Link>
                            <Link 
                                to="/login"
                                className="d-flex flex-row column-gap-2 text-decoration-none" 
                                style={{ 
                                    color: location.pathname === '/login' ? "#366273" : "#011826",
                                
                                }}
                            >
                                <FontAwesomeIcon icon={faRightToBracket} className="fs-5"/>
                                <span className="fs-6 fw-bolder">Login</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-1" style={{ backgroundColor: "#366273" }}></div>
        </>
    )


}