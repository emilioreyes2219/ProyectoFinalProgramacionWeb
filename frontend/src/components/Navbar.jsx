import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

export default function Navbar() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    return (

        <header className="navbar">


            <div className="usuario-navbar">


                <img
                    src={
                        user?.avatar ??
                        "https://ui-avatars.com/api/?name=" + user?.name
                    }
                    alt="avatar"
                    className="avatar"
                />


                <div>

                    <h3>
                        Bienvenido, {user?.name}
                    </h3>


                    <small>
                        {user?.email}
                    </small>


                    <br />


                    <small>
                        Rol: {user?.role}
                    </small>

                </div>


            </div>



            <div>

                <Link to="/perfil">
                    Perfil
                </Link>


                <LogoutButton />

            </div>


        </header>

    );
}