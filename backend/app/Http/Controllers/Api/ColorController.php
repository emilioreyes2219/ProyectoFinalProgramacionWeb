<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreColorRequest;
use App\Http\Requests\UpdateColorRequest;
use App\Models\Color;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Color::query();

        if ($request->filled('buscar')) {
            $query->where('nombre', 'like', '%' . $request->buscar . '%');
        }

        if ($request->has('activo')) {
            $query->where('activo', $request->boolean('activo'));
        }

        $colores = $query
            ->orderBy('nombre')
            ->paginate(10)
            ->withQueryString();

        return response()->json($colores);
    }

    public function store(StoreColorRequest $request): JsonResponse
    {
        $color = Color::create($request->validated());

        return response()->json([
            'message' => 'Color creado correctamente.',
            'data' => $color,
        ], 201);
    }

    public function show(Color $color): JsonResponse
    {
        return response()->json([
            'data' => $color,
        ]);
    }

    public function update(
        UpdateColorRequest $request,
        Color $color
    ): JsonResponse {
        $color->update($request->validated());

        return response()->json([
            'message' => 'Color actualizado correctamente.',
            'data' => $color,
        ]);
    }

    public function destroy(Color $color): JsonResponse
    {
        if ($color->productos()->exists()) {
            return response()->json([
                'message' => 'No se puede eliminar el color porque está asociado a productos.',
            ], 409);
        }

        $color->delete();

        return response()->json([
            'message' => 'Color eliminado correctamente.',
        ]);
    }
}