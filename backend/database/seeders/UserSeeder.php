<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@fundasvolantes.com',
            'password' => Hash::make('Admin#123'),
            'role' => 'admin',
            'telefono' => '9510000001',
        ]);

        User::create([
            'name' => 'Vendedor',
            'email' => 'vendedor@fundasvolantes.com',
            'password' => Hash::make('Vendedor#123'),
            'role' => 'vendedor',
            'telefono' => '9510000002',
        ]);

        User::create([
            'name' => 'Cliente Prueba',
            'email' => 'cliente@fundasvolantes.com',
            'password' => Hash::make('Cliente#123'),
            'role' => 'cliente',
            'telefono' => '9510000003',
        ]);
    }
}