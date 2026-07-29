import { useEffect, useState } from "react";
import { obtenerDashboard } from "../../services/dashboardService";


export default function Dashboard() {


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const [datos, setDatos] = useState({

    productos:0,

    categorias:0,

    usuarios:0,

    pedidos:0,

    recientes:[]

});



    const cargarDatos = async()=>{

        try{

            const response = await obtenerDashboard();

            setDatos(response);


        }catch(error){

            console.log(error);

        }

    };



    useEffect(()=>{

        cargarDatos();

    },[]);



    return (

        <div className="dashboard">


            <h1>
                Dashboard
            </h1>



            <div className="bienvenida">

                <h2>
                    Bienvenido, {user?.name}
                </h2>

                <p>
                    Rol:
                    {" "}
                    <strong>
                        {user?.role}
                    </strong>
                </p>

            </div>





            <div className="cards-dashboard">


                <div className="card-dashboard">

                    <h3>
                        Productos
                    </h3>

                    <span>
                        {datos.productos}
                    </span>

                </div>





                <div className="card-dashboard">

                    <h3>
                        Categorías
                    </h3>

                    <span>
                        {datos.categorias}
                    </span>

                </div>





                <div className="card-dashboard">

                    <h3>
                        Usuarios
                    </h3>

                    <span>
                        {datos.usuarios}
                    </span>

                </div>





                <div className="card-dashboard">

                    <h3>
                        Pedidos
                    </h3>

                    <span>
                        {datos.pedidos}
                    </span>

                </div>



            </div>





            <div className="panel-dashboard">


                <h2>
                    Productos recientes
                </h2>


               <ul>

{
    datos.recientes.map((producto)=>(

        <li key={producto.id}>

            {producto.nombre}
            {" - $"}
            {producto.precio}

        </li>

    ))
}

</ul>


            </div>



        </div>

    );

}