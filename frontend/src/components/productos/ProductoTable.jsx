export default function ProductoTable({

    productos,

    eliminar,

    activar,

    eliminarPermanente,

    editar

}) {


return (

<table>


<thead>

<tr>

<th>
Nombre
</th>

<th>
Precio
</th>

<th>
Stock
</th>

<th>
Categoria
</th>

<th>
Estado
</th>

<th>
Acciones
</th>

</tr>

</thead>



<tbody>


{

productos.map(producto=>(


<tr key={producto.id}>


<td>
{producto.nombre}
</td>


<td>
${producto.precio}
</td>


<td>
{producto.stock}
</td>

<td>
    {producto.categoria?.nombre || "Sin categoría"}
</td>

<td>

{
producto.activo
?
"Activo"
:
"Inactivo"
}

</td>



<td>

<div className="acciones-producto">
<button
onClick={() =>
editar(producto)
}
>
Editar
</button>



{

producto.activo ? (


<button
onClick={() =>
eliminar(producto.id)
}
>
Desactivar
</button>


) : (


<button
onClick={() =>
activar(producto.id)
}
>
Activar
</button>


)

}




<button
onClick={() =>
eliminarPermanente(producto.id)
}
>
Eliminar
</button>

</div>

</td>


</tr>


))


}


</tbody>


</table>

);


}