<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
       $this->call([
    UserSeeder::class,
    CategoriaSeeder::class,
    ColorSeeder::class,
    ProductoSeeder::class,
    ProductoColorSeeder::class,
    PedidoSeeder::class,
    DetallePedidoSeeder::class,
]);
    }
}