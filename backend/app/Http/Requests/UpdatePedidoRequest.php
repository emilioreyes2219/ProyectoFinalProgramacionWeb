<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePedidoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'estado' => [
                'required',
                Rule::in([
                    'pendiente',
                    'confirmado',
                    'en_preparacion',
                    'enviado',
                    'entregado',
                    'cancelado',
                ]),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'estado.required' => 'El estado del pedido es obligatorio.',
            'estado.in' => 'El estado seleccionado no es válido.',
        ];
    }
}