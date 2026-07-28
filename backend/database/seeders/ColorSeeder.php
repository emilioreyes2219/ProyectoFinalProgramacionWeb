<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    public function run(): void
    {
        $colores = [
            ['nombre' => 'Negro', 'codigo_hex' => '#000000'],
            ['nombre' => 'Rojo', 'codigo_hex' => '#FF0000'],
            ['nombre' => 'Azul', 'codigo_hex' => '#0000FF'],
            ['nombre' => 'Gris', 'codigo_hex' => '#808080'],
            ['nombre' => 'Blanco', 'codigo_hex' => '#FFFFFF'],
            ['nombre' => 'Café', 'codigo_hex' => '#8B4513'],
            ['nombre' => 'Beige', 'codigo_hex' => '#F5F5DC'],
            ['nombre' => 'Verde', 'codigo_hex' => '#008000'],
            ['nombre' => 'Morado', 'codigo_hex' => '#800080'],
            ['nombre' => 'Naranja', 'codigo_hex' => '#FFA500'],
        ];

        foreach ($colores as $color) {
            Color::updateOrCreate(
                ['nombre' => $color['nombre']],
                [
                    'codigo_hex' => $color['codigo_hex'],
                    'activo' => true,
                ]
            );
        }
    }
}