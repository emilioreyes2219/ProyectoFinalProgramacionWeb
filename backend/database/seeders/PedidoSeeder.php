<?php

namespace Database\Seeders;

use App\Models\Pedido;
use App\Models\User;
use Illuminate\Database\Seeder;

class PedidoSeeder extends Seeder
{
    public function run(): void
    {
        $cliente = User::where('email', 'cliente@fundasvolantes.com')->firstOrFail();

        $pedidos = [
            [
                'folio' => 'FV-0001',
                'estado' => 'entregado',
                'total' => 798.00,
                'direccion_envio' => 'Oaxaca de Juárez, Oaxaca',
                'telefono_contacto' => '9510000003',
                'notas' => 'Pedido de prueba entregado.',
            ],
            [
                'folio' => 'FV-0002',
                'estado' => 'enviado',
                'total' => 420.00,
                'direccion_envio' => 'Santa Lucía del Camino, Oaxaca',
                'telefono_contacto' => '9510000003',
                'notas' => null,
            ],
            [
                'folio' => 'FV-0003',
                'estado' => 'confirmado',
                'total' => 599.00,
                'direccion_envio' => 'Oaxaca de Juárez, Oaxaca',
                'telefono_contacto' => '9510000003',
                'notas' => null,
            ],
            [
                'folio' => 'FV-0004',
                'estado' => 'pendiente',
                'total' => 549.00,
                'direccion_envio' => 'Santa Cruz Xoxocotlán, Oaxaca',
                'telefono_contacto' => '9510000003',
                'notas' => null,
            ],
            [
                'folio' => 'FV-0005',
                'estado' => 'en_preparacion',
                'total' => 758.00,
                'direccion_envio' => 'Oaxaca de Juárez, Oaxaca',
                'telefono_contacto' => '9510000003',
                'notas' => 'Entregar por la tarde.',
            ],
            [
                'folio' => 'FV-0006',
                'estado' => 'entregado',
                'total' => 449.00,
                'direccion_envio' => 'San Antonio de la Cal, Oaxaca',
                'telefono_contacto' => '9510000003',
                'notas' => null,
            ],
            [
                'folio' => 'FV-0007',
                'estado' => 'cancelado',
                'total' => 269.00,
                'direccion_envio' => 'Oaxaca de Juárez, Oaxaca',
                'telefono_contacto' => '9510000003',
                'notas' => 'Pedido cancelado por el cliente.',
            ],
            [
                'folio' => 'FV-0008',
                'estado' => 'confirmado',
                'total' => 658.00,
                'direccion_envio' => 'Santa Lucía del Camino, Oaxaca',
                'telefono_contacto' => '9510000003',
                'notas' => null,
            ],
            [
                'folio' => 'FV-0009',
                'estado' => 'enviado',
                'total' => 749.00,
                'direccion_envio' => 'Oaxaca de Juárez, Oaxaca',
                'telefono_contacto' => '9510000003',
                'notas' => null,
            ],
            [
                'folio' => 'FV-0010',
                'estado' => 'pendiente',
                'total' => 678.00,
                'direccion_envio' => 'Santa Cruz Xoxocotlán, Oaxaca',
                'telefono_contacto' => '9510000003',
                'notas' => null,
            ],
        ];

        foreach ($pedidos as $pedido) {
            Pedido::updateOrCreate(
                ['folio' => $pedido['folio']],
                [
                    'user_id' => $cliente->id,
                    'estado' => $pedido['estado'],
                    'total' => $pedido['total'],
                    'direccion_envio' => $pedido['direccion_envio'],
                    'telefono_contacto' => $pedido['telefono_contacto'],
                    'notas' => $pedido['notas'],
                ]
            );
        }
    }
}