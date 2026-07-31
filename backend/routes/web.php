<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
use Illuminate\Support\Facades\Mail;
use App\Mail\CorreoPrueba;

Route::get('/correo-prueba', function () {
    Mail::to('gera.martinezzz603@gmail.com')
        ->send(new CorreoPrueba());

    return 'Correo enviado';
});
