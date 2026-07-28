<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePedidoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'direccion_envio' => ['required', 'string', 'max:500'],
            'telefono_contacto' => ['required', 'string', 'max:20'],
            'notas' => ['nullable', 'string', 'max:1000'],

            'productos' => ['required', 'array', 'min:1'],

            'productos.*.producto_id' => [
                'required',
                'integer',
                'exists:productos,id',
            ],

            'productos.*.cantidad' => [
                'required',
                'integer',
                'min:1',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'direccion_envio.required' => 'La dirección de envío es obligatoria.',
            'telefono_contacto.required' => 'El teléfono de contacto es obligatorio.',

            'productos.required' => 'Debes agregar al menos un producto al pedido.',
            'productos.array' => 'Los productos deben enviarse como una lista.',
            'productos.min' => 'Debes agregar al menos un producto al pedido.',

            'productos.*.producto_id.required' => 'El producto es obligatorio.',
            'productos.*.producto_id.exists' => 'Uno de los productos seleccionados no existe.',

            'productos.*.cantidad.required' => 'La cantidad es obligatoria.',
            'productos.*.cantidad.integer' => 'La cantidad debe ser un número entero.',
            'productos.*.cantidad.min' => 'La cantidad debe ser al menos 1.',
        ];
    }
}