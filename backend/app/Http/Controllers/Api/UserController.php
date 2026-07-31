<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Listar usuarios
     */
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->filled('buscar')) {
            $buscar = $request->buscar;

            $query->where(function ($q) use ($buscar) {
                $q->where('name', 'like', "%{$buscar}%")
                  ->orWhere('email', 'like', "%{$buscar}%")
                  ->orWhere('telefono', 'like', "%{$buscar}%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        if ($request->filled('activo')) {
            $query->where('activo', $request->activo);
        }

        $usuarios = $query
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return response()->json($usuarios);
    }

    /**
     * Crear usuario
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'telefono' => 'nullable|string|max:20',
            'password' => 'required|min:6',
            'role' => 'required|in:admin,vendedor,cliente',
        ]);

        $usuario = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'telefono' => $request->telefono,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'activo' => true,
        ]);

        return response()->json([
            'message' => 'Usuario creado correctamente.',
            'data' => $usuario,
        ], 201);
    }

    /**
     * Mostrar usuario
     */
    public function show(User $user): JsonResponse
    {
        return response()->json($user);
    }

    /**
     * Actualizar usuario
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'telefono' => 'nullable|string|max:20',
            'role' => 'required|in:admin,vendedor,cliente',
            'activo' => 'required|boolean',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'telefono' => $request->telefono,
            'role' => $request->role,
            'activo' => $request->activo,
        ]);

        if ($request->filled('password')) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        return response()->json([
            'message' => 'Usuario actualizado correctamente.',
            'data' => $user,
        ]);
    }

    /**
     * Desactivar usuario
     */
    public function destroy(User $user): JsonResponse
    {
        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'No se puede desactivar un administrador.',
            ], 403);
        }

        $user->update([
            'activo' => false,
        ]);

        return response()->json([
            'message' => 'Usuario desactivado correctamente.',
        ]);
    }

    /**
     * Activar usuario
     */
    public function activate(User $user): JsonResponse
    {
        $user->update([
            'activo' => true,
        ]);

        return response()->json([
            'message' => 'Usuario activado correctamente.',
        ]);
    }
}
