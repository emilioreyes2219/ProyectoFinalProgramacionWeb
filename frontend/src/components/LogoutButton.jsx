import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

export default function LogoutButton() {

    const navigate = useNavigate();

    const cerrarSesion = async () => {

        await logout();

        navigate("/login");

    };

    return (

        <button onClick={cerrarSesion}>

            Cerrar sesión

        </button>

    );

}