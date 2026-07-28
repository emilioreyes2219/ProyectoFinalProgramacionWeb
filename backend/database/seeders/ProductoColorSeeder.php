<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Seeder;

class ProductoColorSeeder extends Seeder
{
    public function run(): void
    {
        Producto::where('nombre', 'Funda Racing Negra')
            ->first()
            ?->colores()
            ->sync([1, 4]);

        Producto::where('nombre', 'Funda Sport Roja')
            ->first()
            ?->colores()
            ->sync([2, 1]);

        Producto::where('nombre', 'Funda Clásica Negra')
            ->first()
            ?->colores()
            ->sync([1, 4, 5]);

        Producto::where('nombre', 'Funda Premium Elegance')
            ->first()
            ?->colores()
            ->sync([1, 6, 7]);

        Producto::where('nombre', 'Funda Tipo Cuero Café')
            ->first()
            ?->colores()
            ->sync([6, 7]);

        Producto::where('nombre', 'Funda Grip Pro')
            ->first()
            ?->colores()
            ->sync([1, 3]);

        Producto::where('nombre', 'Funda Comfort Plus')
            ->first()
            ?->colores()
            ->sync([4, 7]);

        Producto::where('nombre', 'Funda Universal Basic')
            ->first()
            ?->colores()
            ->sync([1, 4, 5]);

        Producto::where('nombre', 'Funda Minimal Black')
            ->first()
            ?->colores()
            ->sync([1]);

        Producto::where('nombre', 'Funda Luxury Edition')
            ->first()
            ?->colores()
            ->sync([1, 6]);
    }
}