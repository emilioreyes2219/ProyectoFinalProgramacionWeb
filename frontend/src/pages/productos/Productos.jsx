import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    obtenerProductos,
    eliminarProducto,
    activarProducto,
    eliminarProductoPermanente
} from "../../services/productoService";

import ProductoTable from "../../components/productos/ProductoTable";
import ProductoForm from "../../components/productos/ProductoForm";
import { obtenerCategorias } from "../../services/categoriaService";
export default function Productos(){


    const [productos, setProductos] = useState([]);
const [mostrarForm, setMostrarForm] = useState(false);
const [productoEditar, setProductoEditar] = useState(null);
const [categorias, setCategorias] = useState([]);
const [pagina, setPagina] = useState(1);

const [meta, setMeta] = useState({});

const [filtros, setFiltros] = useState({

    buscar:"",
    categoria_id:"",
    activo:""

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

        title: "¿Eliminar definitivamente?",

        text: "Esta acción no se puede deshacer.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Sí, eliminar",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#dc2626",

        cancelButtonColor: "#7c3aed"

    });



    if(!resultado.isConfirmed)
        return;



    try{


        await eliminarProductoPermanente(id);



        Swal.fire({

            title: "¡Eliminado!",

            text: "El producto fue eliminado permanentemente.",

            icon: "success",

            confirmButtonColor: "#7c3aed"

        });



        cargarProductos();



    }catch(error){


        console.log(error);



        Swal.fire({

            title: "Error",

            text: "No se pudo eliminar el producto.",

            icon: "error",

            confirmButtonColor: "#7c3aed"

        });


    }

};


    const eliminar = async (id) => {

    try {

        const confirmar = window.confirm(
            "¿Eliminar producto?"
        );


        if(!confirmar)
            return;


        await eliminarProducto(id);

Swal.fire({

    title: "Eliminado",

    text: "El producto fue eliminado permanentemente.",

    icon: "success",

    confirmButtonColor: "#7c3aed"

});

        cargarProductos();


    } catch(error){


        console.log(
            error.response?.data
        );


        alert(
            "No se pudo eliminar"
        );


    }

};




   const editar = (producto)=>{

    setProductoEditar(producto);

    setMostrarForm(true);

};





    return(

        <div>


            <h1>
                Productos
            </h1>

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
        categorias.map((categoria)=>(

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

           <button
    onClick={() =>
        setMostrarForm(true)
    }
>
    Nuevo producto
</button>
{
    mostrarForm && (

        <ProductoForm

cerrar={()=>{
    setMostrarForm(false);
    setProductoEditar(null);
}}

actualizarLista={
    cargarProductos
}

productoEditar={
    productoEditar
}

/>

    )
}



            <ProductoTable

productos={productos}

eliminar={eliminar}

activar={activar}

eliminarPermanente={eliminarPermanente}

editar={editar}

/>

<div className="paginacion">


<button

disabled={!meta.prev_page_url}

onClick={()=>
setPagina(pagina-1)
}

>
Anterior
</button>



<span>

Página {meta.current_page}
de {meta.last_page}

</span>



<button

disabled={!meta.next_page_url}

onClick={()=>
setPagina(pagina+1)
}

>
Siguiente
</button>


</div>


        </div>

    );

}