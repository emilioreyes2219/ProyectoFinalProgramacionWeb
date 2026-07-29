import ProductoForm from "./ProductoForm";

export default function ProductoModal({
    abierto,
    producto,
    onCerrar,
    actualizarLista,
}) {

    if (!abierto) return null;

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.45)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >

            <div
                style={{
                    background: "#fff",
                    width: "900px",
                    maxWidth: "95%",
                    borderRadius: "12px",
                    padding: "30px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >

                <ProductoForm
                    cerrar={onCerrar}
                    actualizarLista={actualizarLista}
                    productoEditar={producto}
                />

            </div>

        </div>

    );

}