import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import PedidoTable from "../../components/pedidos/PedidoTable";
import PedidoModal from "../../components/pedidos/PedidoModal";

import {
    obtenerPedidos,
    actualizarPedido,
    eliminarPedido,
} from "../../services/pedidoService";


export default function Pedidos() {


    const [pedidos, setPedidos] = useState([]);

    const [modalAbierto, setModalAbierto] = useState(false);

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);


    const [cargando, setCargando] = useState(true);

    const [error, setError] = useState("");





    useEffect(() => {

        cargarPedidos();

    }, []);







    const cargarPedidos = async () => {


        try {


            setCargando(true);

            setError("");



            const data = await obtenerPedidos();



            setPedidos(
                data.data ?? data
            );



        } catch (error) {


            console.error(error);



            setError(
                "No se pudieron cargar los pedidos."
            );



        } finally {


            setCargando(false);


        }


    };








    const editarPedido = (pedido) => {


        setPedidoSeleccionado(pedido);


        setModalAbierto(true);


    };









    const guardarPedido = async (pedidoActualizado) => {


        try {


            await actualizarPedido(

                pedidoSeleccionado.id,

                pedidoActualizado

            );



            Swal.fire(

                "Actualizado",

                "Pedido actualizado correctamente.",

                "success"

            );



            setModalAbierto(false);



            cargarPedidos();




        } catch (error) {


            console.error(error);



            Swal.fire(

                "Error",

                error.response?.data?.message ??

                "No fue posible actualizar el pedido.",

                "error"

            );


        }


    };









    const borrarPedido = async (pedido) => {



        const respuesta = await Swal.fire({


            title:"¿Eliminar pedido?",


            text:`Pedido #${pedido.id}`,


            icon:"warning",


            showCancelButton:true,


            confirmButtonText:"Eliminar",


            cancelButtonText:"Cancelar",



        });





        if(!respuesta.isConfirmed)

            return;








        try {



            await eliminarPedido(

                pedido.id

            );



            Swal.fire(

                "Eliminado",

                "Pedido eliminado correctamente.",

                "success"

            );



            cargarPedidos();





        } catch(error) {



            console.error(error);



            Swal.fire(

                "Error",

                error.response?.data?.message ??

                "No fue posible eliminar.",

                "error"

            );



        }


    };









    return (



        <div>



            <h1>

                Pedidos

            </h1>






            {
                cargando && (

                    <h3>

                        Cargando pedidos...

                    </h3>

                )
            }






            {
                error && (

                    <p className="error">

                        {error}

                    </p>

                )
            }







            {
                !cargando && !error && (


                    <PedidoTable

                        pedidos={pedidos}

                        onEditar={editarPedido}

                        onEliminar={borrarPedido}

                    />


                )
            }







            <PedidoModal

                abierto={modalAbierto}

                pedido={pedidoSeleccionado}

                onCerrar={() =>

                    setModalAbierto(false)

                }

                onGuardar={guardarPedido}

            />




        </div>


    );


}