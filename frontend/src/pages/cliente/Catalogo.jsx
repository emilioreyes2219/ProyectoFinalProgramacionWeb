import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { obtenerProductos } from "../../services/productoService";
import { obtenerCategorias } from "../../services/categoriaService";


export default function Catalogo(){


    const [productos, setProductos] = useState([]);

    const [categorias,setCategorias] = useState([]);

    const [buscar,setBuscar] = useState("");

    const [categoria,setCategoria] = useState("");





    const cargarProductos = async()=>{

        try{

            const response = await obtenerProductos();

            setProductos(response.data);

        }catch(error){

            console.log(error);

        }

    };





    const cargarCategorias = async()=>{

        try{

            const data = await obtenerCategorias();

            setCategorias(data.data ?? data);

        }catch(error){

            console.log(error);

        }

    };





    useEffect(()=>{

        cargarProductos();

        cargarCategorias();

    },[]);







    const agregarCarrito = (producto)=>{


    let carrito = JSON.parse(

        localStorage.getItem("carrito")

    ) || [];



    const existe = carrito.find(

        item=>item.id === producto.id

    );



    if(existe){


        if(existe.cantidad >= producto.stock){


            Swal.fire(
                "Stock máximo",
                "No hay más productos disponibles",
                "warning"
            );


            return;

        }



        carrito = carrito.map(item=>

            item.id === producto.id

            ?

            {
                ...item,
                cantidad:item.cantidad + 1
            }

            :

            item

        );



    }else{


        carrito.push({

            ...producto,

            cantidad:1

        });


    }



    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );



    Swal.fire({

        icon:"success",

        title:"Agregado al carrito",

        timer:1200,

        showConfirmButton:false

    });


};








    const productosFiltrados = productos.filter((producto)=>{


        const coincideNombre =

            producto.nombre

            .toLowerCase()

            .includes(

                buscar.toLowerCase()

            );



        const coincideCategoria =

            categoria === "" ||

            producto.categoria?.id == categoria;



        return coincideNombre && coincideCategoria;


    });







    return (


        <div className="catalogo">



            <h1>
                Catálogo de productos
            </h1>





            <div className="filtros-catalogo">



                <input

                    placeholder="Buscar producto"

                    value={buscar}

                    onChange={(e)=>
                        setBuscar(e.target.value)
                    }

                />





                <select

                    value={categoria}

                    onChange={(e)=>
                        setCategoria(e.target.value)
                    }

                >


                    <option value="">
                        Todas las categorías
                    </option>



                    {
                        categorias.map((cat)=>(

                            <option

                                key={cat.id}

                                value={cat.id}

                            >

                                {cat.nombre}

                            </option>


                        ))
                    }



                </select>



            </div>







            <div className="productos-grid">



            {

                productosFiltrados.map((producto)=>(



                    <div

                        className="producto-card"

                        key={producto.id}

                    >



                        <h3>

                            {producto.nombre}

                        </h3>




                        {

                            producto.categoria && (

                                <span className="categoria">

                                    {producto.categoria.nombre}

                                </span>

                            )

                        }





                        <p>

                            {producto.descripcion}

                        </p>





                        <h2>

                            ${producto.precio}

                        </h2>





                        <p>

                            Stock disponible:

                            {" "}

                            {producto.stock}

                        </p>







                        <button

                            onClick={()=>

                                agregarCarrito(producto)

                            }

                        >

                            Agregar al carrito 🛒

                        </button>




                    </div>



                ))

            }



            </div>



        </div>


    );

}