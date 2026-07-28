<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoriaRequest;
use App\Http\Requests\UpdateCategoriaRequest;
use App\Models\Categoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Categoria::query();

        if ($request->filled('buscar')) {
            $query->where('nombre', 'like', '%' . $request->buscar . '%');
        }

        if ($request->has('activo')) {
            $query->where('activo', $request->boolean('activo'));
        }

        $categorias = $query
            ->orderBy('nombre')
            ->paginate(10)
            ->withQueryString();

        return response()->json($categorias);
    }

    public function store(StoreCategoriaRequest $request): JsonResponse
    {
        $categoria = Categoria::create($request->validated());

        return response()->json([
            'message' => 'Categoría creada correctamente.',
            'data' => $categoria,
        ], 201);
    }

    public function show(Categoria $categoria): JsonResponse
    {
        return response()->json([
            'data' => $categoria,
        ]);
    }

    public function update(
        UpdateCategoriaRequest $request,
        Categoria $categoria
    ): JsonResponse {
        $categoria->update($request->validated());

        return response()->json([
            'message' => 'Categoría actualizada correctamente.',
            'data' => $categoria,
        ]);
    }

    public function destroy(Categoria $categoria): JsonResponse
    {
        if ($categoria->productos()->exists()) {
            return response()->json([
                'message' => 'No se puede eliminar la categoría porque tiene productos asociados.',
            ], 409);
        }

        $categoria->delete();

        return response()->json([
            'message' => 'Categoría eliminada correctamente.',
        ]);
    }
}