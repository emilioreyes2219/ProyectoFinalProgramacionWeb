<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pedido confirmado</title>
</head>

<body>

<h2>¡Gracias por tu compra!</h2>

<p>Tu pedido ha sido registrado correctamente.</p>

<p>
<strong>Folio:</strong> {{ $pedido->folio }}
</p>

<p>
<strong>Total:</strong> ${{ number_format($pedido->total,2) }}
</p>

<h3>Productos:</h3>

<ul>
@foreach($pedido->detalles as $detalle)
    <li>
        {{ $detalle->producto->nombre }}
        -
        Cantidad: {{ $detalle->cantidad }}
        -
        ${{ number_format($detalle->subtotal,2) }}
    </li>
@endforeach
</ul>

<p>
Te notificaremos cuando cambie el estado de tu pedido.
</p>

<br>

<p>
Fundas de Volantes
</p>

</body>
</html>
