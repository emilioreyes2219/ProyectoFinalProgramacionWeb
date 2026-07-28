<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductoRequest;
use App\Http\Requests\UpdateProductoRequest;
use App\Http\Resources\ProductoResource;
use App\Models\Producto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductoController extends Controller
{
    /**
     * Listar productos con paginación y filtros.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Producto::query()
            ->with(['categoria', 'colores']);

        // Buscar por nombre
        if ($request->filled('buscar')) {
            $query->where('nombre', 'like', '%' . $request->buscar . '%');
        }

        // Filtrar por categoría
        if ($request->filled('categoria_id')) {
            $query->where('categoria_id', $request->categoria_id);
        }

        // Filtrar por estado
        if ($request->has('activo')) {
            $query->where('activo', $request->boolean('activo'));
        }

        $productos = $query
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return ProductoResource::collection($productos);
    }

    /**
     * Crear producto.
     */
    public function store(StoreProductoRequest $request): JsonResponse
    {
        $datos = $request->validated();

        $colores = $datos['colores'] ?? [];
        unset($datos['colores']);

        $producto = Producto::create($datos);

        $producto->colores()->sync($colores);

        $producto->load(['categoria', 'colores']);

        return response()->json([
            'message' => 'Producto creado correctamente.',
            'data' => new ProductoResource($producto),
        ], 201);
    }

    /**
     * Mostrar producto.
     */
    public function show(Producto $producto): ProductoResource
    {
        $producto->load(['categoria', 'colores']);

        return new ProductoResource($producto);
    }

    /**
     * Actualizar producto.
     */
    public function update(
        UpdateProductoRequest $request,
        Producto $producto
    ): JsonResponse {
        $datos = $request->validated();

        if (array_key_exists('colores', $datos)) {
            $colores = $datos['colores'];
            unset($datos['colores']);

            $producto->colores()->sync($colores);
        }

        $producto->update($datos);

        $producto->load(['categoria', 'colores']);

        return response()->json([
            'message' => 'Producto actualizado correctamente.',
            'data' => new ProductoResource($producto),
        ]);
    }

    /**
     * Eliminar producto.
     */
    public function destroy(Producto $producto): JsonResponse
    {
        $producto->delete();

        return response()->json([
            'message' => 'Producto eliminado correctamente.',
        ]);
    }
}