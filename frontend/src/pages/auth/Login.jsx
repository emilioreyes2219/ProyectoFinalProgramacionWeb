import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";


export default function Login() {


    const navigate = useNavigate();


    const [form, setForm] = useState({
        email: "",
        password: ""
    });


    const [mensaje, setMensaje] = useState("");



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            const response = await api.post(
                "/login",
                form
            );


            console.log(response.data);



            localStorage.setItem(
                "token",
                response.data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );



         localStorage.setItem(
    "token",
    response.data.token
);

localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
);


setMensaje(
    "Inicio de sesión exitoso"
);


navigate("/dashboard");



        } catch(error) {


            console.log(error.response?.data);


            setMensaje(
                error.response?.data?.message ??
                "Correo o contraseña incorrectos"
            );


        }

    };



    return (

        <div className="login-card">


            <h2>
                Iniciar sesión
            </h2>


            <p className="subtitle">
                Ingresa para continuar comprando
            </p>



            <form onSubmit={handleSubmit}>


                <div className="input-group">


                    <Mail />


                    <input

                        type="email"

                        name="email"

                        placeholder="Correo electrónico"

                        value={form.email}

                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value
                            })
                        }

                        required

                    />


                </div>





                <div className="input-group">


                    <Lock />


                    <input

                        type="password"

                        name="password"

                        placeholder="Contraseña"

                        value={form.password}

                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value
                            })
                        }

                        required

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





                <button type="submit">

                    Entrar

                </button>





                <p className="message">

                    {mensaje}

                </p>





                <p className="register">


                    ¿No tienes cuenta?



                    <a href="/register">

                        Crear cuenta

                    </a>


                </p>


            </form>


        </div>

    );

}