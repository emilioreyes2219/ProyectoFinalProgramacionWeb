<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Color extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'codigo_hex',
        'activo',
    ];

    public function productos(): BelongsToMany
    {
        return $this->belongsToMany(
            Producto::class,
            'color_producto',
            'color_id',
            'producto_id'
        )->withTimestamps();
    }
}