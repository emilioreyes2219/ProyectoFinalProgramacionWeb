<?php

namespace Database\Seeders;

use App\Models\DetallePedido;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Database\Seeder;

class DetallePedidoSeeder extends Seeder
{
    public function run(): void
    {
        $detalles = [
            // FV-0001 = 2 x 399 = 798
            [
                'folio' => 'FV-0001',
                'producto' => 'Funda Racing Negra',
                'cantidad' => 2,
                'precio_unitario' => 399.00,
            ],

            // FV-0002 = 420
            [
                'folio' => 'FV-0002',
                'producto' => 'Funda Sport Roja',
                'cantidad' => 1,
                'precio_unitario' => 420.00,
            ],

            // FV-0003 = 599
            [
                'folio' => 'FV-0003',
                'producto' => 'Funda Premium Elegance',
                'cantidad' => 1,
                'precio_unitario' => 599.00,
            ],

            // FV-0004 = 549
            [
                'folio' => 'FV-0004',
                'producto' => 'Funda Tipo Cuero Café',
                'cantidad' => 1,
                'precio_unitario' => 549.00,
            ],

            // FV-0005 = 2 x 379 = 758
            [
                'folio' => 'FV-0005',
                'producto' => 'Funda Grip Pro',
                'cantidad' => 2,
                'precio_unitario' => 379.00,
            ],

            // FV-0006 = 449
            [
                'folio' => 'FV-0006',
                'producto' => 'Funda Comfort Plus',
                'cantidad' => 1,
                'precio_unitario' => 449.00,
            ],

            // FV-0007 = 269
            [
                'folio' => 'FV-0007',
                'producto' => 'Funda Universal Basic',
                'cantidad' => 1,
                'precio_unitario' => 269.00,
            ],

            // FV-0008 = 2 x 329 = 658
            [
                'folio' => 'FV-0008',
                'producto' => 'Funda Minimal Black',
                'cantidad' => 2,
                'precio_unitario' => 329.00,
            ],

            // FV-0009 = 749
            [
                'folio' => 'FV-0009',
                'producto' => 'Funda Luxury Edition',
                'cantidad' => 1,
                'precio_unitario' => 749.00,
            ],

            // FV-0010 = 299 + 379 = 678
            [
                'folio' => 'FV-0010',
                'producto' => 'Funda Clásica Negra',
                'cantidad' => 1,
                'precio_unitario' => 299.00,
            ],
            [
                'folio' => 'FV-0010',
                'producto' => 'Funda Grip Pro',
                'cantidad' => 1,
                'precio_unitario' => 379.00,
            ],
        ];

        foreach ($detalles as $detalle) {
            $pedido = Pedido::where('folio', $detalle['folio'])->firstOrFail();

            $producto = Producto::where(
                'nombre',
                $detalle['producto']
            )->firstOrFail();

            $subtotal = $detalle['cantidad'] * $detalle['precio_unitario'];

            DetallePedido::updateOrCreate(
                [
                    'pedido_id' => $pedido->id,
                    'producto_id' => $producto->id,
                ],
                [
                    'cantidad' => $detalle['cantidad'],
                    'precio_unitario' => $detalle['precio_unitario'],
                    'subtotal' => $subtotal,
                ]
            );
        }
    }
}