import {
    Pencil,
    Trash2,
} from "lucide-react";

import "./CategoriaTable.css";

export default function CategoriaTable({
    categorias,
    onEditar,
    onEliminar,
}) {

    return (

        <div className="table-container">

            <table className="categoria-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Nombre</th>

                        <th>Descripción</th>

                        <th>Estado</th>

                        <th style={{ width: "160px" }}>
                            Acciones
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {categorias.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="empty"
                            >
                                No existen categorías.
                            </td>

                        </tr>

                    ) : (

                        categorias.map((categoria) => (

                            <tr key={categoria.id}>

                                <td>

                                    {categoria.id}

                                </td>

                                <td>

                                    <strong>

                                        {categoria.nombre}

                                    </strong>

                                </td>

                                <td>

                                    {categoria.descripcion || "-"}

                                </td>

                                <td>

                                    <span
                                        className={
                                            categoria.activo
                                                ? "badge active"
                                                : "badge inactive"
                                        }
                                    >
                                        {
                                            categoria.activo
                                                ? "Activa"
                                                : "Inactiva"
                                        }
                                    </span>

                                </td>

                                <td>

                                    <div className="actions">

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                onEditar(categoria)
                                            }
                                        >

                                            <Pencil size={18} />

                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                onEliminar(categoria)
                                            }
                                        >

                                            <Trash2 size={18} />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}