<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('pedidos', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')
        ->constrained('users')
        ->cascadeOnUpdate()
        ->restrictOnDelete();

    $table->string('folio')->unique();

    $table->enum('estado', [
        'pendiente',
        'confirmado',
        'en_preparacion',
        'enviado',
        'entregado',
        'cancelado'
    ])->default('pendiente');

    $table->decimal('total', 10, 2)->default(0);

    $table->string('direccion_envio', 255);
    $table->string('telefono_contacto', 20);

    $table->text('notas')->nullable();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
