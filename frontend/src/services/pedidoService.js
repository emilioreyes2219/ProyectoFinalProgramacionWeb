import api from "./api";
import { getToken } from "./auth";

const authConfig = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const obtenerPedidos = async (
    pagina = 1,
    buscar = ""
) => {

    const response = await api.get("/pedidos",{

        params:{
            page:pagina,
            buscar
        },

        ...authConfig()

    });

    return response.data;

};

export const crearPedido = async (pedido)=>{

    const response = await api.post(
        "/pedidos",
        pedido,
        authConfig()
    );

    return response.data;

};

export const actualizarPedido = async(id,pedido)=>{

    const response = await api.put(
        `/pedidos/${id}`,
        pedido,
        authConfig()
    );

    return response.data;

};

export const eliminarPedido = async(id)=>{

    return await api.delete(
        `/pedidos/${id}`,
        authConfig()
    );

};