<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\ProductoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\PedidoController;
use Illuminate\Support\Facades\Mail;
use App\Mail\CorreoPrueba;
use App\Http\Controllers\Api\UserController;

Route::get('/correo-prueba', function () {
    Mail::to('TU_CORREO@gmail.com')->send(new CorreoPrueba());

    return response()->json([
        'mensaje' => 'Correo enviado correctamente'
    ]);
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

// Dashboard
Route::get('/dashboard', [DashboardController::class, 'index']);
    // Autenticación
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Prueba de rol administrador
    Route::get('/admin/test', function () {
        return response()->json([
            'message' => 'Acceso de administrador correcto.',
        ]);
    })->middleware('role:admin');

// =========================
// USUARIOS
// =========================

Route::middleware('role:admin')->group(function () {

    Route::get('/usuarios', [UserController::class, 'index']);

    Route::post('/usuarios', [UserController::class, 'store']);

    Route::get('/usuarios/{user}', [UserController::class, 'show']);

    Route::put('/usuarios/{user}', [UserController::class, 'update']);

    Route::delete('/usuarios/{user}', [UserController::class, 'destroy']);

});

// =========================
// PEDIDOS
// =========================

// Todos los usuarios autenticados
Route::get('/pedidos', [PedidoController::class, 'index']);
Route::get('/pedidos/{pedido}', [PedidoController::class, 'show']);

// Cliente puede crear pedidos
Route::post('/pedidos', [PedidoController::class, 'store'])
    ->middleware('role:cliente');

// Admin y vendedor gestionan el estado
Route::put('/pedidos/{pedido}', [PedidoController::class, 'update'])
    ->middleware('role:admin,vendedor');

// Admin puede eliminar pedidos pendientes
Route::delete('/pedidos/{pedido}', [PedidoController::class, 'destroy'])
    ->middleware('role:admin');



   // =========================
// PRODUCTOS
// =========================

Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{producto}', [ProductoController::class, 'show']);


Route::middleware('role:admin,vendedor')->group(function () {

    Route::post('/productos', [ProductoController::class, 'store']);

    Route::put('/productos/{producto}', [ProductoController::class, 'update']);


    // Desactivar
    Route::delete(
        '/productos/{producto}',
        [ProductoController::class, 'destroy']
    );


    // Activar
    Route::put(
        '/productos/{producto}/activate',
        [ProductoController::class, 'activate']
    );

});


// Solo administrador
Route::delete(
    '/productos/{producto}/force',
    [ProductoController::class, 'forceDelete']
)->middleware('role:admin');

    // =========================
    // COLORES
    // =========================

    Route::get('/colores', [ColorController::class, 'index']);
    Route::get('/colores/{color}', [ColorController::class, 'show']);

    Route::middleware('role:admin,vendedor')->group(function () {
        Route::post('/colores', [ColorController::class, 'store']);
        Route::put('/colores/{color}', [ColorController::class, 'update']);
        Route::delete('/colores/{color}', [ColorController::class, 'destroy']);
    });

    // =========================
    // CATEGORÍAS
    // =========================

    Route::get('/categorias', [CategoriaController::class, 'index']);
    Route::get('/categorias/{categoria}', [CategoriaController::class, 'show']);

    Route::middleware('role:admin,vendedor')->group(function () {
        Route::post('/categorias', [CategoriaController::class, 'store']);
        Route::put('/categorias/{categoria}', [CategoriaController::class, 'update']);
        Route::delete('/categorias/{categoria}', [CategoriaController::class, 'destroy']);
    });

});
