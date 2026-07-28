<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        $productos = [
            [
                'categoria' => 'Deportivas',
                'nombre' => 'Funda Racing Negra',
                'descripcion' => 'Funda deportiva con acabado antideslizante.',
                'precio' => 399.00,
                'stock' => 25,
            ],
            [
                'categoria' => 'Deportivas',
                'nombre' => 'Funda Sport Roja',
                'descripcion' => 'Funda deportiva en color rojo con costuras reforzadas.',
                'precio' => 420.00,
                'stock' => 18,
            ],
            [
                'categoria' => 'Clásicas',
                'nombre' => 'Funda Clásica Negra',
                'descripcion' => 'Diseño tradicional y elegante para uso diario.',
                'precio' => 299.00,
                'stock' => 30,
            ],
            [
                'categoria' => 'Premium',
                'nombre' => 'Funda Premium Elegance',
                'descripcion' => 'Funda de alta calidad con acabado elegante.',
                'precio' => 599.00,
                'stock' => 12,
            ],
            [
                'categoria' => 'Cuero',
                'nombre' => 'Funda Tipo Cuero Café',
                'descripcion' => 'Funda con acabado tipo cuero en tono café.',
                'precio' => 549.00,
                'stock' => 15,
            ],
            [
                'categoria' => 'Antideslizantes',
                'nombre' => 'Funda Grip Pro',
                'descripcion' => 'Diseñada para mejorar el agarre y comodidad.',
                'precio' => 379.00,
                'stock' => 22,
            ],
            [
                'categoria' => 'Acolchadas',
                'nombre' => 'Funda Comfort Plus',
                'descripcion' => 'Funda acolchada para mayor comodidad al conducir.',
                'precio' => 449.00,
                'stock' => 17,
            ],
            [
                'categoria' => 'Universales',
                'nombre' => 'Funda Universal Basic',
                'descripcion' => 'Compatible con distintos tamaños de volante.',
                'precio' => 269.00,
                'stock' => 40,
            ],
            [
                'categoria' => 'Minimalistas',
                'nombre' => 'Funda Minimal Black',
                'descripcion' => 'Diseño sencillo en color negro.',
                'precio' => 329.00,
                'stock' => 20,
            ],
            [
                'categoria' => 'Lujo',
                'nombre' => 'Funda Luxury Edition',
                'descripcion' => 'Diseño premium orientado a vehículos de lujo.',
                'precio' => 749.00,
                'stock' => 10,
            ],
        ];

        foreach ($productos as $producto) {
            $categoria = Categoria::where('nombre', $producto['categoria'])->first();

            Producto::updateOrCreate(
                ['nombre' => $producto['nombre']],
                [
                    'categoria_id' => $categoria->id,
                    'descripcion' => $producto['descripcion'],
                    'precio' => $producto['precio'],
                    'stock' => $producto['stock'],
                    'imagen' => null,
                    'activo' => true,
                ]
            );
        }
    }
}