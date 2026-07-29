import { useEffect, useState } from "react";
import { obtenerPedidos } from "../../services/pedidoService";


export default function MisPedidos(){


    const [pedidos,setPedidos] = useState([]);



    const cargarPedidos = async()=>{

        try{

            const data = await obtenerPedidos();

            setPedidos(data.data);


        }catch(error){

            console.log(error);

        }

    };



    useEffect(()=>{

        cargarPedidos();

    },[]);





    return (

        <div>


            <h1>
                Mis pedidos 📦
            </h1>



            {
                pedidos.length === 0 ? (

                    <p>
                        No tienes pedidos todavía
                    </p>

                )


                :


                pedidos.map((pedido)=>(


                    <div
                        key={pedido.id}
                        className="pedido-card"
                    >


                        <h2>
                            Pedido {pedido.folio}
                        </h2>


                        <p>
                            Estado:
                            {" "}
                            {pedido.estado}
                        </p>


                        <p>
                            Total:
                            $
                            {pedido.total}
                        </p>



                    </div>


                ))

            }



        </div>

    );

}