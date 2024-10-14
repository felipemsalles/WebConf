import { NavLink, Outlet } from "react-router-dom";
import useCategorias from "../hooks/useCategorias";

const HomePage = () => {
    const { data: categorias, isLoading, error } = useCategorias();

    if(isLoading) return <h6>Carregando...</h6>;

    if(error) throw error;

    return (
        <div className="row">
            <div className="col-lg-2">
                <div className="nav flex-column row-gap-2 nav-pills">
                    <h5 className="fw-bold" style={{color: "#011826"}}>Categorias</h5>
                    <NavLink 
                        aria-current="page" 
                        className="nav-link" 
                        to="/"
                        style={({ isActive }) => 
                            isActive
                                ? {
                                    color: "#011826",
                                    background: "#f0f0f2"
                                }
                                : {
                                    
                                    color: "#f0f0f2",
                                    background: "#011826"
                                }
                        }
                    >
                        Todos
                    </NavLink>
                    {categorias?.map((categoria) => (
                        <NavLink 
                            key={categoria.id} 
                            className="nav-link" 
                            to={`/${categoria.slug}`}
                            style={({ isActive }) => 
                                isActive
                                    ? {
                                        color: "#011826",
                                        background: "#f0f0f2"
                                    }
                                    : {
                                        color: "#f0f0f2",
                                        background: "#011826"
                                    }
                            }    
                        >
                            {categoria.nome}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="col-lg-10">
                <Outlet />
            </div>
        </div>
    );
};

export default HomePage;