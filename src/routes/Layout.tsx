import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function Layout() {
    return (
        <>
            <NavBar />
            <div className="mx-4 mt-3">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;