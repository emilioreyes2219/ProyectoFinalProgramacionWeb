<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CorreoPrueba extends Mailable
{
    use Queueable, SerializesModels;

    public function build()
    {
        return $this
            ->subject('Prueba de correo')
            ->html('
                <h1>¡Correo enviado correctamente!</h1>
                <p>Este correo fue enviado desde Laravel en la VPS.</p>
            ');
    }
}
