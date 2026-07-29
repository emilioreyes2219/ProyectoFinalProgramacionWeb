import { useEffect, useState } from "react";
import { obtenerCategorias } from "../../services/categoriaService";

export default function Categorias() {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {

        cargarCategorias();

    }, []);

    const cargarCategorias = async () => {

        try {

            const data = await obtenerCategorias();

            setCategorias(data.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div>

            <h1>Categorías</h1>

            <table border="1" cellPadding="10">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Activa</th>

                    </tr>

                </thead>

                <tbody>

                    {categorias.map((categoria) => (

                        <tr key={categoria.id}>

                            <td>{categoria.id}</td>

                            <td>{categoria.nombre}</td>

                            <td>{categoria.descripcion}</td>

                            <td>

                                {categoria.activo ? "Sí" : "No"}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}