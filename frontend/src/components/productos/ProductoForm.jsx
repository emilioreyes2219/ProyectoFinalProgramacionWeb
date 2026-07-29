
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
    crearProducto,
    actualizarProducto
} from "../../services/productoService";

import {
    obtenerCategorias
} from "../../services/categoriaService";

export default function ProductoForm({
    cerrar,
    actualizarLista,
    productoEditar
}) {


 const [form, setForm] = useState({

    nombre: productoEditar?.nombre || "",
    descripcion: productoEditar?.descripcion || "",
    precio: productoEditar?.precio || "",
    stock: productoEditar?.stock || "",
    imagen: productoEditar?.imagen || "",
    categoria_id: productoEditar?.categoria_id || ""

});
useEffect(()=>{

    if(productoEditar){

        setForm({

            nombre: productoEditar.nombre || "",

            descripcion: productoEditar.descripcion || "",

            precio: productoEditar.precio || "",

            stock: productoEditar.stock || "",

            imagen: productoEditar.imagen || "",

            categoria_id: productoEditar.categoria_id || ""

        });

    }else{

        setForm({

            nombre:"",
            descripcion:"",
            precio:"",
            stock:"",
            imagen:"",
            categoria_id:""

        });

    }


},[productoEditar]);

const [categorias, setCategorias] = useState([]);
useEffect(()=>{

    cargarCategorias();

},[]);



const cargarCategorias = async()=>{

    try{

        const data = await obtenerCategorias();

        setCategorias(data.data);


    }catch(error){

        console.log(error);

    }

};


    const handleChange = (e)=>{

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };



    const guardar = async(e)=>{

        e.preventDefault();


        try{


            if(productoEditar){

    await actualizarProducto(
        productoEditar.id,
        form
    );

   Swal.fire({

    title: "¡Actualizado!",

    text: "El producto se actualizó correctamente.",

    icon: "success",

    confirmButtonColor: "#7c3aed"

});

}else{

    await crearProducto(form);

   Swal.fire({

    title: "¡Producto creado!",

    text: "El producto se agregó correctamente.",

    icon: "success",

    confirmButtonColor: "#7c3aed"

});
}


           Swal.fire({

    title: "¡Producto creado!",

    text: "El producto se agregó correctamente.",

    icon: "success",

    confirmButtonColor: "#7c3aed"

});


            actualizarLista();


            cerrar();



        }catch(error){


            console.log(
                error.response?.data
            );

Swal.fire({

    title: "Error",

    text: "No se pudo guardar el producto.",

    icon: "error",

    confirmButtonColor: "#7c3aed"

});


        }


    };



    return (

        <div className="form-producto">


            <h2>
{
productoEditar
?
"Editar producto"
:
"Nuevo producto"
}
</h2>



            <form onSubmit={guardar}>


                <input
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />



                <input
                    name="descripcion"
                    value={form.descripcion}
                    placeholder="Descripción"
                    onChange={handleChange}
                />



                <input
                    name="precio"
                    type="number"
                    value={form.precio}
                    placeholder="Precio"
                    onChange={handleChange}
                    required
                />



                <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    placeholder="Stock"
                    onChange={handleChange}
                    required
                />



                <input
                    name="imagen"
                    value={form.imagen}
                    placeholder="Imagen URL"
                    onChange={handleChange}
                />


<select
    name="categoria_id"
    value={form.categoria_id}
    onChange={handleChange}
    required
>

<option value="">
    Seleccionar categoría
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



                <button>
                    Guardar
                </button>



                <button
                    type="button"
                    onClick={cerrar}
                >
                    Cancelar
                </button>


            </form>


        </div>

    );

}