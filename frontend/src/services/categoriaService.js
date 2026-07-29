import api from "./api";
import { getToken } from "./auth";

const authConfig = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

export const obtenerCategorias = async (
    pagina = 1,
    buscar = ""
) => {

    const response = await api.get("/categorias", {
        params: {
            page: pagina,
            buscar,
        },
        ...authConfig(),
    });

    return response.data;

};

export const crearCategoria = async (categoria) => {

    const response = await api.post(
        "/categorias",
        categoria,
        authConfig()
    );

    return response.data;

};

export const actualizarCategoria = async (id, categoria) => {

    const response = await api.put(
        `/categorias/${id}`,
        categoria,
        authConfig()
    );

    return response.data;

};

export const eliminarCategoria = async (id) => {

    return await api.delete(
        `/categorias/${id}`,
        authConfig()
    );

};