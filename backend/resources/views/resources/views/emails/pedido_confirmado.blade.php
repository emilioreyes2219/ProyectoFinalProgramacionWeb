<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pedido confirmado</title>
</head>

<body>

<h2>¡Gracias por tu compra en Fundas de Volantes!</h2>

<p>Hola {{ $pedido->usuario->name }},</p>

<p>
Tu pedido ha sido registrado correctamente.
</p>

<h3>Datos del pedido</h3>

<ul>
    <li>
        Folio:
        <strong>{{ $pedido->folio }}</strong>
    </li>

    <li>
        Estado:
        <strong>{{ $pedido->estado }}</strong>
    </li>

    <li>
        Total:
        <strong>${{ number_format($pedido->total,2) }}</strong>
    </li>
</ul>


<h3>Productos:</h3>

<table border="1" cellpadding="8">

<tr>
    <th>Producto</th>
    <th>Cantidad</th>
    <th>Precio</th>
    <th>Subtotal</th>
</tr>


@foreach($pedido->detalles as $detalle)

<tr>

<td>
{{ $detalle->producto->nombre }}
</td>

<td>
{{ $detalle->cantidad }}
</td>

<td>
${{ number_format($detalle->precio_unitario,2) }}
</td>

<td>
${{ number_format($detalle->subtotal,2) }}
</td>

</tr>

@endforeach


</table>


<h3>Envío</h3>

<p>
{{ $pedido->direccion_envio }}
</p>

<p>
Teléfono:
{{ $pedido->telefono_contacto }}
</p>


<p>
Gracias por confiar en nosotros.
</p>


</body>
</html>
