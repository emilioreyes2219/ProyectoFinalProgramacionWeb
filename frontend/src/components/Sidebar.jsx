import { Link } from "react-router-dom";


export default function Sidebar() {


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const role = user?.role;



    return (

        <aside className="sidebar">


            <h2>
                Fundas de Volantes
            </h2>



            <nav>


                {/* ADMIN */}

                {
                    role === "admin" && (

                        <>

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

                        </>

                    )
                }





               

           {/* CLIENTE */}

{
    role === "cliente" && (

        <>

            <Link to="/catalogo">
                🛍️ Catálogo
            </Link>


            <Link to="/carrito">
                🛒 Carrito
            </Link>


            <Link to="/mis-pedidos">
                📦 Mis pedidos
            </Link>

        </>

    )
}





                {/* VENDEDOR */}

                {
    role === "vendedor" && (

        <>

            <Link to="/vendedor">
                📊 Panel vendedor
            </Link>


            <Link to="/productos">
                📦 Productos
            </Link>


            <Link to="/pedidos">
                🛒 Pedidos
            </Link>

        </>

    )
}




                {/* TODOS */}

                <Link to="/perfil">
                    👤 Perfil
                </Link>



            </nav>


        </aside>

    );

}