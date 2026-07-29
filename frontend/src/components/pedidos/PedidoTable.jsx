export default function PedidoTable({
    pedidos,
    onEditar,
    onEliminar,
}) {

    return (

        <table className="table">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Total</th>
                    <th>Fecha</th>
                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody>

                {pedidos.map((pedido) => (

                    <tr key={pedido.id}>

                        <td>{pedido.id}</td>

                        <td>

                            {pedido.user?.name}

                        </td>

                        <td>

                            {pedido.estado}

                        </td>

                        <td>

                            ${Number(pedido.total).toFixed(2)}

                        </td>

                        <td>

                            {new Date(
                                pedido.created_at
                            ).toLocaleDateString()}

                        </td>

                        <td>

                            <button
                                onClick={() => onEditar(pedido)}
                            >
                                Editar
                            </button>

                            {" "}

                            <button
                                onClick={() => onEliminar(pedido)}
                            >
                                Eliminar
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}