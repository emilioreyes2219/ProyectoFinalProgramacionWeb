import { useEffect, useState } from "react";
import Modal from "../ui/Modal";

export default function CategoriaModal({
    abierto,
    categoria,
    onCerrar,
    onGuardar,
}) {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [activo, setActivo] = useState(true);

    useEffect(() => {

        if (abierto) {

            if (categoria) {

                setNombre(categoria.nombre);
                setDescripcion(categoria.descripcion ?? "");
                setActivo(Boolean(categoria.activo));

            } else {

                setNombre("");
                setDescripcion("");
                setActivo(true);

            }

        }

    }, [categoria, abierto]);

    const handleSubmit = (e) => {

        e.preventDefault();

        onGuardar({

            nombre,

            descripcion,

            activo,

        });

    };

    return (

        <Modal
            isOpen={abierto}
            title={
                categoria
                    ? "Editar categoría"
                    : "Nueva categoría"
            }
            onClose={onCerrar}
        >

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>

                        Nombre

                    </label>

                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                        required
                    />

                </div>

                <div className="form-group">

                    <label>

                        Descripción

                    </label>

                    <textarea
                        rows="4"
                        value={descripcion}
                        onChange={(e) =>
                            setDescripcion(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>

                        <input
                            type="checkbox"
                            checked={activo}
                            onChange={(e) =>
                                setActivo(e.target.checked)
                            }
                        />

                        {" "}Categoría activa

                    </label>

                </div>

                <div className="modal-actions">

                    <button
                        type="button"
                        onClick={onCerrar}
                    >
                        Cancelar
                    </button>

                    <button type="submit">

                        Guardar

                    </button>

                </div>

            </form>

        </Modal>

    );

}