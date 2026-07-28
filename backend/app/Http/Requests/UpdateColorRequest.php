<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateColorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => [
                'sometimes',
                'required',
                'string',
                'max:50',
                Rule::unique('colors', 'nombre')
                    ->ignore($this->route('color')),
            ],
            'codigo_hex' => [
                'sometimes',
                'nullable',
                'regex:/^#[0-9A-Fa-f]{6}$/',
            ],
            'activo' => [
                'sometimes',
                'boolean',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre del color es obligatorio.',
            'nombre.unique' => 'Ya existe un color con ese nombre.',
            'nombre.max' => 'El nombre no puede superar los 50 caracteres.',
            'codigo_hex.regex' => 'El código hexadecimal debe tener un formato como #FF0000.',
            'activo.boolean' => 'El estado activo debe ser verdadero o falso.',
        ];
    }
}