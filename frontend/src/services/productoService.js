import api from "../api/axios";


export const obtenerProductos = async (
    filtros,
    pagina
)=>{


    const response = await api.get(
        "/productos",
        {

            params:{

                ...filtros,

                page:pagina

            }

        }
    );


    return response.data;

};



export const crearProducto = async (producto) => {

    const response = await api.post(
        "/productos",
        producto
    );

    return response.data;

};



export const actualizarProducto = async (id, producto) => {

    const response = await api.put(
        `/productos/${id}`,
        producto
    );

    return response.data;

};






export const eliminarProducto = async (id) => {

    const response = await api.delete(
        `/productos/${id}`
    );

    return response.data;

};



export const activarProducto = async (id) => {

    const response = await api.put(
        `/productos/${id}/activate`
    );

    return response.data;

};



export const eliminarProductoPermanente = async (id) => {

    const response = await api.delete(
        `/productos/${id}/force`
    );

    return response.data;

};