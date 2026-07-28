<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $categorias = [
            [
                'nombre' => 'Deportivas',
                'descripcion' => 'Fundas con diseño deportivo para volante.',
            ],
            [
                'nombre' => 'Clásicas',
                'descripcion' => 'Fundas con diseños tradicionales y elegantes.',
            ],
            [
                'nombre' => 'Premium',
                'descripcion' => 'Fundas fabricadas con materiales y acabados de alta calidad.',
            ],
            [
                'nombre' => 'Cuero',
                'descripcion' => 'Fundas con acabado tipo cuero para mayor comodidad y estilo.',
            ],
            [
                'nombre' => 'Antideslizantes',
                'descripcion' => 'Fundas diseñadas para mejorar el agarre del volante.',
            ],
            [
                'nombre' => 'Acolchadas',
                'descripcion' => 'Fundas con mayor grosor y comodidad para el conductor.',
            ],
            [
                'nombre' => 'Universales',
                'descripcion' => 'Fundas compatibles con una amplia variedad de volantes.',
            ],
            [
                'nombre' => 'Personalizadas',
                'descripcion' => 'Fundas con diseños y estilos personalizados.',
            ],
            [
                'nombre' => 'Minimalistas',
                'descripcion' => 'Fundas con diseños sencillos y modernos.',
            ],
            [
                'nombre' => 'Lujo',
                'descripcion' => 'Fundas orientadas a vehículos y acabados de lujo.',
            ],
        ];

        foreach ($categorias as $categoria) {
            Categoria::updateOrCreate(
                ['nombre' => $categoria['nombre']],
                [
                    'descripcion' => $categoria['descripcion'],
                    'activo' => true,
                ]
            );
        }
    }
}