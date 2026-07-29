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

export default function Productos(){


    const [productos, setProductos] = useState([]);
const [mostrarForm, setMostrarForm] = useState(false);
const [productoEditar, setProductoEditar] = useState(null);

    const cargarProductos = async () => {

        try {

            const data = await obtenerProductos();

            setProductos(data.data);


        } catch(error){

            console.log(error);

        }

    };




    useEffect(()=>{

        cargarProductos();

    },[]);


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


        </div>

    );

}