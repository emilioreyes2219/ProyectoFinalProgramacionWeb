import api from "../api/axios";


const authConfig = () => ({

    headers: {

        Authorization:
        `Bearer ${localStorage.getItem("token")}`,

    },

});



export const obtenerProductos = async (
    filtros = {},
    pagina = 1
)=>{


    const response = await api.get(

        "/productos",

        {

            params:{

                ...filtros,

                page:pagina

            },

            ...authConfig()

        }

    );


    return response.data;


};



export const crearProducto = async(producto)=>{


    const response = await api.post(

        "/productos",

        producto,

        authConfig()

    );


    return response.data;


};




export const actualizarProducto = async(id,producto)=>{


    const response = await api.put(

        `/productos/${id}`,

        producto,

        authConfig()

    );


    return response.data;


};




export const eliminarProducto = async(id)=>{


    const response = await api.delete(

        `/productos/${id}`,

        authConfig()

    );


    return response.data;


};




export const activarProducto = async(id)=>{


    const response = await api.put(

        `/productos/${id}/activate`,

        {},

        authConfig()

    );


    return response.data;


};




export const eliminarProductoPermanente = async(id)=>{


    const response = await api.delete(

        `/productos/${id}/force`,

        authConfig()

    );


    return response.data;


};