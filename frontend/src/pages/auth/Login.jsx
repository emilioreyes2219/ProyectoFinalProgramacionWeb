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

    const [errores, setErrores] = useState({});




    const validar = () => {


        let nuevosErrores = {};



        if(!form.email){

            nuevosErrores.email =
            "El correo es obligatorio";

        }



        if(form.email && 
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ){

            nuevosErrores.email =
            "El correo no es válido";

        }





        if(!form.password){

            nuevosErrores.password =
            "La contraseña es obligatoria";

        }


        if(form.password && form.password.length < 8){

            nuevosErrores.password =
            "La contraseña debe tener mínimo 8 caracteres";

        }



        setErrores(nuevosErrores);



        return Object.keys(nuevosErrores).length === 0;

    };







    const handleSubmit = async(e)=>{


        e.preventDefault();


        setMensaje("");



        if(!validar())
            return;




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



            setMensaje(
                "Inicio de sesión exitoso"
            );



            const rol = response.data.user.role;



            if(rol === "admin"){

                navigate("/dashboard");

            }
            else if(rol === "cliente"){

                navigate("/catalogo");

            }
            else if(rol === "vendedor"){

                navigate("/vendedor");

            }





        }catch(error){



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

                        placeholder="Correo electrónico"

                        value={form.email}


                        onChange={(e)=>{


                            setForm({

                                ...form,

                                email:e.target.value

                            });



                            setErrores({

                                ...errores,

                                email:""

                            });


                        }}


                    />


                </div>




                {
                    errores.email &&

                    <small className="error">

                        {errores.email}

                    </small>

                }







                <div className="input-group">


                    <Lock />


                    <input


                        type="password"


                        placeholder="Contraseña"


                        value={form.password}



                        onChange={(e)=>{


                            setForm({

                                ...form,

                                password:e.target.value

                            });



                            setErrores({

                                ...errores,

                                password:""

                            });


                        }}



                    />


                </div>




                {
                    errores.password &&

                    <small className="error">

                        {errores.password}

                    </small>

                }







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





                {
                    mensaje &&

                    <p className="message">

                        {mensaje}

                    </p>

                }






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