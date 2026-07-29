import { useEffect, useState } from "react";

export default function PedidoModal({

    abierto,

    pedido,

    onCerrar,

    onGuardar,

}) {

    const [estado, setEstado] = useState("pendiente");

    useEffect(() => {

        if (pedido) {

            setEstado(pedido.estado);

        } else {

            setEstado("pendiente");

        }

    }, [pedido]);

    if (!abierto) return null;

    const guardar = (e) => {

        e.preventDefault();

        onGuardar({

            estado,

        });

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>

                    Actualizar pedido

                </h2>

                <form onSubmit={guardar}>

                    <label>

                        Estado

                    </label>

                    <select
                        value={estado}
                        onChange={(e) =>
                            setEstado(e.target.value)
                        }
                    >

                        <option value="pendiente">
                            Pendiente
                        </option>

                       <option value="confirmado">
    Confirmado
</option>

<option value="en_preparacion">
    En preparación
</option>

                        <option value="enviado">
                            Enviado
                        </option>

                        <option value="entregado">
                            Entregado
                        </option>

                        <option value="cancelado">
                            Cancelado
                        </option>

                    </select>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "20px",
                            justifyContent: "flex-end",
                        }}
                    >

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

            </div>

        </div>

    );

}