import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import CategoriaTable from "../../components/categorias/CategoriaTable";
import CategoriaModal from "../../components/categorias/CategoriaModal";

import {
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
} from "../../services/categoriaService";

export default function Categorias() {

    const [categorias, setCategorias] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [pagina, setPagina] = useState(1);

const [buscar, setBuscar] = useState("");

const [pagination, setPagination] = useState({});

    useEffect(() => {

    cargarCategorias();

}, [pagina, buscar]);

    const cargarCategorias = async () => {

    try {

        const data = await obtenerCategorias(
            pagina,
            buscar
        );

        setCategorias(data.data);

        setPagination(data);

    } catch (error) {

        console.error(error);

    }

};

    const nuevaCategoria = () => {
        setCategoriaSeleccionada(null);
        setModalAbierto(true);
    };

    const editarCategoria = (categoria) => {
        setCategoriaSeleccionada(categoria);
        setModalAbierto(true);
    };

    const guardarCategoria = async (categoria) => {

        try {

            if (categoriaSeleccionada) {

                await actualizarCategoria(
                    categoriaSeleccionada.id,
                    categoria
                );

                Swal.fire(
                    "Actualizada",
                    "La categoría fue actualizada.",
                    "success"
                );

            } else {

                await crearCategoria(categoria);

                Swal.fire(
                    "Creada",
                    "La categoría fue creada.",
                    "success"
                );

            }

            setModalAbierto(false);
            cargarCategorias();

        } catch (error) {

            Swal.fire(
                "Error",
                error.response?.data?.message ??
                "No fue posible guardar.",
                "error"
            );

        }

    };

    const borrarCategoria = async (categoria) => {

        const resultado = await Swal.fire({

            title: "¿Eliminar categoría?",

            text: categoria.nombre,

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Eliminar",

            cancelButtonText: "Cancelar",

        });

        if (!resultado.isConfirmed) return;

        try {

            await eliminarCategoria(categoria.id);

            Swal.fire(
                "Eliminada",
                "La categoría fue eliminada.",
                "success"
            );

            cargarCategorias();

        } catch (error) {

            Swal.fire(
                "No se puede eliminar",
                error.response?.data?.message ??
                "Ocurrió un error.",
                "error"
            );

        }

    };

    return (

        <div className="card">

            <div className="card-header">

                <h2>Categorías</h2>

                <button
                    className="btn-primary"
                    onClick={nuevaCategoria}
                >
                    + Nueva categoría
                </button>

            </div>
<div
    style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
    }}
>

    <input
        type="text"
        placeholder="Buscar categoría..."
        value={buscar}
        onChange={(e) => {

            setBuscar(e.target.value);

            setPagina(1);

        }}
        style={{
            width: "300px",
            padding: "10px",
        }}
    />

</div>
            <CategoriaTable
                categorias={categorias}
                onEditar={editarCategoria}
                onEliminar={borrarCategoria}
            />
<div
    style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }}
>

    <span>

        Mostrando

        {" "}

        {pagination.from ?? 0}

        -

        {pagination.to ?? 0}

        de

        {" "}

        {pagination.total ?? 0}

        categorías

    </span>

    <div>

        <button
            disabled={!pagination.prev_page_url}
            onClick={() => setPagina(pagina - 1)}
        >
            Anterior
        </button>

        <span
            style={{
                margin: "0 15px",
            }}
        >

            Página

            {" "}

            {pagination.current_page ?? 1}

            {" "}

            de

            {" "}

            {pagination.last_page ?? 1}

        </span>

        <button
            disabled={!pagination.next_page_url}
            onClick={() => setPagina(pagina + 1)}
        >
            Siguiente
        </button>

    </div>

</div>
            <CategoriaModal
                abierto={modalAbierto}
                categoria={categoriaSeleccionada}
                onCerrar={() => setModalAbierto(false)}
                onGuardar={guardarCategoria}
            />

        </div>

        

    );

}