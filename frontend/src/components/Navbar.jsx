import LogoutButton from "./LogoutButton";

export default function Navbar() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <header className="navbar">

            <div>

                <h3>

                    Bienvenido, {user?.name}

                </h3>

                <small>

                    Rol: {user?.role}

                </small>

            </div>

            <LogoutButton />

        </header>

    );

}