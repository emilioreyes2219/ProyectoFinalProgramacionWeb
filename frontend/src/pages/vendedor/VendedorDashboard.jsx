import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { obtenerPedidos } from "../../services/pedidoService";
import { obtenerProductos } from "../../services/productoService";


export default function VendedorDashboard(){


    const user = JSON.parse(
        localStorage.getItem("user")
    );



    const [productos,setProductos] = useState(0);

    const [pendientes,setPendientes] = useState(0);

    const [ventas,setVentas] = useState(0);





    useEffect(()=>{


        cargarDatos();


    },[]);





    const cargarDatos = async()=>{


        try{


            const productosData = await obtenerProductos();


            setProductos(
                productosData.data.length
            );



            const pedidosData = await obtenerPedidos();



            const pedidos = pedidosData.data;



            setPendientes(

                pedidos.filter(

                    pedido =>
                    pedido.estado === "pendiente"

                ).length

            );




            const totalVentas = pedidos.reduce(

                (suma,pedido)=>{


                    if(
                        pedido.estado === "entregado"
                    ){

                        return suma + Number(pedido.total);

                    }


                    return suma;


                },

                0

            );



            setVentas(totalVentas);



        }catch(error){


            console.log(error);


        }


    };





    return (


        <div className="dashboard">


            <h1>
                Panel de vendedor
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
                        {productos}
                    </span>


                </div>





                <div className="card-dashboard">

                    <h3>
                        Pedidos pendientes
                    </h3>


                    <span>
                        {pendientes}
                    </span>


                </div>





                <div className="card-dashboard">

                    <h3>
                        Ventas del día
                    </h3>


                    <span>
                        ${ventas}
                    </span>


                </div>



            </div>





            <div className="panel-dashboard">


                <h2>
                    Acciones rápidas
                </h2>



                <Link to="/productos">

                    <button>
                        Ver productos
                    </button>

                </Link>



                <Link to="/pedidos">

                    <button>
                        Gestionar pedidos
                    </button>

                </Link>



            </div>



        </div>

    );

}