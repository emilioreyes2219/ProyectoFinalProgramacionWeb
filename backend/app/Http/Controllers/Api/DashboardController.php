<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
      return response()->json([

    'productos' => Producto::count(),

    'categorias' => Categoria::count(),

    'usuarios' => User::count(),

    'pedidos' => 0,


    'recientes' => Producto::orderBy('created_at', 'desc')
        ->limit(5)
        ->get([
            'id',
            'nombre',
            'precio'
        ])

]);
    }
}