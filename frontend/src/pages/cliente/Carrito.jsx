import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { crearPedido } from "../../services/pedidoService";

export default function Carrito(){


    const [carrito,setCarrito] = useState([]);



    useEffect(()=>{

        cargarCarrito();

    },[]);




    const cargarCarrito = ()=>{

        const productos = JSON.parse(
            localStorage.getItem("carrito")
        ) || [];


        setCarrito(productos);

    };
    const comprar = async()=>{


    try{


        const pedido = {

            productos: carrito.map(producto => ({

                producto_id: producto.id,

                cantidad: producto.cantidad

            })),

            direccion_envio: "Oaxaca",

            telefono_contacto: "9510000000"


        };



        const respuesta = await crearPedido(pedido);



        console.log(respuesta);



        Swal.fire({

            icon:"success",

            title:"Pedido creado",

            text:"Tu compra fue realizada correctamente"

        });



        localStorage.removeItem("carrito");


        setCarrito([]);



    }catch(error){


        console.log(error.response?.data);



        Swal.fire({

            icon:"error",

            title:"Error",

            text:
            error.response?.data?.message ??
            "No se pudo crear el pedido"

        });


    }


};





    const cambiarCantidad = (id, cantidad)=>{


        const nuevo = carrito.map(producto=>{


            if(producto.id === id){


                if(cantidad > producto.stock){


                    Swal.fire(
                        "Stock insuficiente",
                        `Solo hay ${producto.stock} disponibles`,
                        "warning"
                    );


                    return producto;

                }



                return {

                    ...producto,

                    cantidad:cantidad

                };


            }


            return producto;


        });



        setCarrito(nuevo);


        localStorage.setItem(
            "carrito",
            JSON.stringify(nuevo)
        );


    };







    const eliminar = (id)=>{


        const nuevo = carrito.filter(

            producto => producto.id !== id

        );



        setCarrito(nuevo);



        localStorage.setItem(
            "carrito",
            JSON.stringify(nuevo)
        );


    };







    const total = carrito.reduce(

        (suma, producto)=>


            suma +

            (Number(producto.precio) *

            producto.cantidad),


        0

    );







    return (


        <div>


            <h1>
                Mi carrito 🛒
            </h1>





            {
                carrito.length === 0 ?


                (

                    <p>
                        Carrito vacío
                    </p>


                )


                :


                (

                    <>


                    {
                        carrito.map(producto=>(


                            <div
                                key={producto.id}
                            >



                                <h3>
                                    {producto.nombre}
                                </h3>



                                <p>
                                    Precio:
                                    ${producto.precio}
                                </p>



                                <p>
                                    Stock disponible:
                                    {producto.stock}
                                </p>





                                <input

                                    type="number"

                                    min="1"

                                    max={producto.stock}

                                    value={producto.cantidad}

                                    onChange={(e)=>

                                        cambiarCantidad(

                                            producto.id,

                                            Number(e.target.value)

                                        )

                                    }

                                />






                                <button

                                    onClick={()=>
                                        eliminar(producto.id)
                                    }

                                >

                                    Eliminar

                                </button>



                            </div>


                        ))
                    }






                    <h2>

                        Total:

                        ${total.toFixed(2)}

                    </h2>




<button
    onClick={comprar}
>
    Comprar
</button>



                    </>


                )

            }



        </div>


    );

}