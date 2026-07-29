import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
    obtenerProductos,
    eliminarProducto,
    activarProducto,
    eliminarProductoPermanente
} from "../../services/productoService";

import { obtenerCategorias } from "../../services/categoriaService";

import ProductoTable from "../../components/productos/ProductoTable";
import ProductoModal from "../../components/productos/ProductoModal";


export default function Productos() {


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const rol = user?.role;



    const [productos, setProductos] = useState([]);

    const [mostrarForm, setMostrarForm] = useState(false);

    const [productoEditar, setProductoEditar] = useState(null);

    const [categorias, setCategorias] = useState([]);

    const [pagina, setPagina] = useState(1);

    const [meta, setMeta] = useState({});


    const [filtros, setFiltros] = useState({

        buscar: "",
        categoria_id: "",
        activo: ""

    });





    const cargarProductos = async () => {

        try {

            const data = await obtenerProductos(
                filtros,
                pagina
            );


            setProductos(data.data);

            setMeta(data.meta);


        } catch(error){

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

    },[pagina,filtros]);







    const activar = async(id)=>{

        try{

            await activarProducto(id);

            cargarProductos();

        }catch(error){

            console.log(error);

        }

    };







    const eliminarPermanente = async(id)=>{


        const resultado = await Swal.fire({

            title:"¿Eliminar definitivamente?",

            text:"Esta acción no se puede deshacer.",

            icon:"warning",

            showCancelButton:true,

            confirmButtonText:"Sí, eliminar",

            cancelButtonText:"Cancelar"

        });



        if(!resultado.isConfirmed)
            return;



        try{


            await eliminarProductoPermanente(id);


            Swal.fire(
                "Eliminado",
                "Producto eliminado.",
                "success"
            );


            cargarProductos();


        }catch(error){

            console.log(error);

        }


    };








    const eliminar = async(id)=>{


        const resultado = await Swal.fire({

            title:"¿Eliminar producto?",

            icon:"warning",

            showCancelButton:true,

            confirmButtonText:"Eliminar",

            cancelButtonText:"Cancelar"

        });



        if(!resultado.isConfirmed)
            return;



        try{


            await eliminarProducto(id);


            Swal.fire(
                "Eliminado",
                "Producto eliminado.",
                "success"
            );


            cargarProductos();


        }catch(error){

            console.log(error);

        }


    };







    const editar=(producto)=>{

        setProductoEditar(producto);

        setMostrarForm(true);

    };







    return (

        <div>


            <div>


                <h1>
                    Productos
                </h1>



                {
                    rol === "admin" && (

                        <button

                            onClick={()=>{

                                setProductoEditar(null);

                                setMostrarForm(true);

                            }}

                        >

                            Nuevo producto

                        </button>

                    )
                }


            </div>







            <div className="filtros-productos">



                <input

                    placeholder="Buscar producto"

                    value={filtros.buscar}

                    onChange={(e)=>

                        setFiltros({

                            ...filtros,

                            buscar:e.target.value

                        })

                    }

                />






                <select

                    value={filtros.activo}

                    onChange={(e)=>

                        setFiltros({

                            ...filtros,

                            activo:e.target.value

                        })

                    }

                >

                    <option value="">
                        Todos
                    </option>


                    <option value="true">
                        Activos
                    </option>


                    <option value="false">
                        Inactivos
                    </option>


                </select>








                <select

                    value={filtros.categoria_id}

                    onChange={(e)=>

                        setFiltros({

                            ...filtros,

                            categoria_id:e.target.value

                        })

                    }

                >


                    <option value="">
                        Todas las categorías
                    </option>



                    {
                        categorias.map(categoria=>(

                            <option

                                key={categoria.id}

                                value={categoria.id}

                            >

                                {categoria.nombre}

                            </option>

                        ))
                    }


                </select>



            </div>







            {
                rol === "admin" && (

                    <ProductoModal

                        abierto={mostrarForm}

                        producto={productoEditar}

                        actualizarLista={cargarProductos}

                        onCerrar={()=>{

                            setMostrarForm(false);

                            setProductoEditar(null);

                        }}

                    />

                )
            }







            <ProductoTable

                productos={productos}

                editar={editar}

                eliminar={eliminar}

                activar={activar}

                eliminarPermanente={eliminarPermanente}

                rol={rol}

            />







            <div>


                Mostrando:

                {meta.from ?? 0}

                -

                {meta.to ?? 0}

                de

                {meta.total ?? 0}

                productos





                <div>



                    <button

                        disabled={!meta.prev_page_url}

                        onClick={()=>setPagina(pagina-1)}

                    >

                        Anterior

                    </button>





                    Página {meta.current_page}





                    <button

                        disabled={!meta.next_page_url}

                        onClick={()=>setPagina(pagina+1)}

                    >

                        Siguiente

                    </button>



                </div>



            </div>



        </div>

    );

}