import {
    Mail,
    Lock
} from "lucide-react";


export default function Login(){

    return(

        <div className="login-card">


            <h2>
                Iniciar sesión
            </h2>


            <p className="subtitle">
                Ingresa para continuar comprando
            </p>


            <form>


                <div className="input-group">

                    <Mail/>

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                    />

                </div>



                <div className="input-group">

                    <Lock/>

                    <input
                        type="password"
                        placeholder="Contraseña"
                    />

                </div>



                <div className="options">

                    <label>

                        <input type="checkbox"/>

                        Recordarme

                    </label>


                    <a href="#">
                        ¿Olvidaste tu contraseña?
                    </a>

                </div>



                <button>
                    Entrar
                </button>



                <p className="register">

                    ¿No tienes cuenta?

                    <a href="#">
                        Crear cuenta
                    </a>

                </p>


            </form>


        </div>

    )
}