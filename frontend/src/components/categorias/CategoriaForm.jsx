import { useEffect, useState } from "react";

export default function CategoriaForm({

    categoria,

    onGuardar,

}) {

    const [nombre, setNombre] = useState("");

    const [descripcion, setDescripcion] = useState("");

    const [activo, setActivo] = useState(true);

    useEffect(() => {

        if (categoria) {

            setNombre(categoria.nombre);

            setDescripcion(categoria.descripcion);

            setActivo(categoria.activo);

        } else {

            setNombre("");

            setDescripcion("");

            setActivo(true);

        }

    }, [categoria]);

    const handleSubmit = (e) => {

        e.preventDefault();

        onGuardar({

            nombre,

            descripcion,

            activo,

        });

    };

    return (

        <form onSubmit={handleSubmit}>

            <label>

                Nombre

            </label>

            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />

            <label>

                Descripción

            </label>

            <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />

            <label>

                <input
                    type="checkbox"
                    checked={activo}
                    onChange={(e) =>
                        setActivo(e.target.checked)
                    }
                />

                Activa

            </label>

            <button type="submit">

                Guardar

            </button>

        </form>

    );

}