<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PedidoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'folio' => $this->folio,
            'estado' => $this->estado,
            'total' => $this->total,

            'cliente' => [
                'id' => $this->usuario?->id,
                'nombre' => $this->usuario?->name,
                'email' => $this->usuario?->email,
            ],

            'direccion_envio' => $this->direccion_envio,
            'telefono_contacto' => $this->telefono_contacto,
            'notas' => $this->notas,

            'productos' => $this->detalles->map(function ($detalle) {
                return [
                    'id' => $detalle->producto->id,
                    'nombre' => $detalle->producto->nombre,
                    'cantidad' => $detalle->cantidad,
                    'precio_unitario' => $detalle->precio_unitario,
                    'subtotal' => $detalle->subtotal,
                ];
            }),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}