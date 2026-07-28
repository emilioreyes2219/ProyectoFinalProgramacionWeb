<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePedidoRequest;
use App\Http\Requests\UpdatePedidoRequest;
use App\Models\DetallePedido;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = Pedido::with([
            'usuario',
            'detalles.producto',
        ]);

        if ($user->role === 'cliente') {
            $query->where('user_id', $user->id);
        }

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->filled('buscar')) {
            $query->where('folio', 'like', '%' . $request->buscar . '%');
        }

        $pedidos = $query
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return response()->json($pedidos);
    }

    public function store(StorePedidoRequest $request): JsonResponse
    {
        $user = $request->user();

        $pedido = DB::transaction(function () use ($request, $user) {
            $total = 0;

            $pedido = Pedido::create([
                'user_id' => $user->id,
                'folio' => $this->generarFolio(),
                'estado' => 'pendiente',
                'total' => 0,
                'direccion_envio' => $request->direccion_envio,
                'telefono_contacto' => $request->telefono_contacto,
                'notas' => $request->notas,
            ]);

            foreach ($request->productos as $item) {
                $producto = Producto::lockForUpdate()
                    ->findOrFail($item['producto_id']);

                if (!$producto->activo) {
                    abort(422, 'Uno de los productos no está disponible.');
                }

                if ($producto->stock < $item['cantidad']) {
                    abort(
                        422,
                        'Stock insuficiente para el producto: ' . $producto->nombre
                    );
                }

                $subtotal = $producto->precio * $item['cantidad'];

                DetallePedido::create([
                    'pedido_id' => $pedido->id,
                    'producto_id' => $producto->id,
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $producto->precio,
                    'subtotal' => $subtotal,
                ]);

                $producto->decrement('stock', $item['cantidad']);

                $total += $subtotal;
            }

            $pedido->update([
                'total' => $total,
            ]);

            return $pedido;
        });

        $pedido->load([
            'usuario',
            'detalles.producto',
        ]);

        return response()->json([
            'message' => 'Pedido creado correctamente.',
            'data' => $pedido,
        ], 201);
    }

    public function show(Request $request, Pedido $pedido): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'cliente' && $pedido->user_id !== $user->id) {
            return response()->json([
                'message' => 'No tienes permiso para ver este pedido.',
            ], 403);
        }

        $pedido->load([
            'usuario',
            'detalles.producto',
        ]);

        return response()->json([
            'data' => $pedido,
        ]);
    }

    public function update(
        UpdatePedidoRequest $request,
        Pedido $pedido
    ): JsonResponse {
        $pedido->update([
            'estado' => $request->estado,
        ]);

        return response()->json([
            'message' => 'Estado del pedido actualizado correctamente.',
            'data' => $pedido,
        ]);
    }

    public function destroy(Pedido $pedido): JsonResponse
    {
        if ($pedido->estado !== 'pendiente') {
            return response()->json([
                'message' => 'Solo se pueden eliminar pedidos pendientes.',
            ], 409);
        }

        DB::transaction(function () use ($pedido) {
            $pedido->load('detalles');

            foreach ($pedido->detalles as $detalle) {
                Producto::where('id', $detalle->producto_id)
                    ->increment('stock', $detalle->cantidad);
            }

            $pedido->delete();
        });

        return response()->json([
            'message' => 'Pedido eliminado correctamente.',
        ]);
    }

    private function generarFolio(): string
    {
        $ultimoId = Pedido::max('id') ?? 0;

        return 'FV-' . str_pad(
            (string) ($ultimoId + 1),
            4,
            '0',
            STR_PAD_LEFT
        );
    }
}