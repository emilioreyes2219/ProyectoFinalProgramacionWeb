import { Link } from "react-router-dom";

export default function Sidebar() {

    return (

        <aside className="sidebar">

            <h2>Fundas de Volantes</h2>

            <nav>

                <Link to="/dashboard">
                    🏠 Dashboard
                </Link>

                <Link to="/categorias">
                    📂 Categorías
                </Link>

                <Link to="/productos">
                    📦 Productos
                </Link>

                <Link to="/pedidos">
                    🛒 Pedidos
                </Link>

                <Link to="/perfil">
                    👤 Perfil
                </Link>

            </nav>

        </aside>

    );

}