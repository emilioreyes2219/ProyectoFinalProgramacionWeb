import { useState } from "react";
import api from "../../api/axios";

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff
} from "lucide-react";


export default function Register(){


    const [form,setForm] = useState({

        name:"",
        email:"",
        password:"",
        password_confirmation:""

    });



    const [mensaje,setMensaje] = useState("");

    const [errores,setErrores] = useState({});


    const [mostrarPassword,setMostrarPassword] = useState(false);

    const [mostrarConfirmar,setMostrarConfirmar] = useState(false);


    const [cargando,setCargando] = useState(false);






    const validarPassword = (password)=>{


        return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(password);


    };








    const handleChange = (e)=>{


        const {
            name,
            value
        } = e.target;



        setForm({

            ...form,

            [name]:value

        });




        let nuevosErrores = {
            ...errores
        };




        if(name==="name"){


            if(value.trim()===""){

                nuevosErrores.name=[
                    "El nombre es obligatorio"
                ];

            }else{

                delete nuevosErrores.name;

            }

        }






        if(name==="email"){


            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){


                nuevosErrores.email=[
                    "Correo electrónico no válido"
                ];


            }else{


                delete nuevosErrores.email;


            }

        }







        if(name==="password"){



            if(!validarPassword(value)){


                nuevosErrores.password=[

                    "Debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial"

                ];


            }else{


                delete nuevosErrores.password;


            }



        }








        if(name==="password_confirmation"){



            if(value !== form.password){


                nuevosErrores.password_confirmation=[

                    "Las contraseñas no coinciden"

                ];


            }else{


                delete nuevosErrores.password_confirmation;


            }


        }






        setErrores(nuevosErrores);


    };









    const validarFormulario=()=>{


        let nuevosErrores={};




        if(!form.name){

            nuevosErrores.name=[
                "El nombre es obligatorio"
            ];

        }




        if(!form.email){

            nuevosErrores.email=[
                "El correo es obligatorio"
            ];

        }




        if(!validarPassword(form.password)){


            nuevosErrores.password=[

                "La contraseña no cumple los requisitos"

            ];

        }




        if(form.password !== form.password_confirmation){


            nuevosErrores.password_confirmation=[

                "Las contraseñas no coinciden"

            ];

        }





        setErrores(nuevosErrores);



        return Object.keys(nuevosErrores).length===0;


    };









    const handleSubmit=async(e)=>{


        e.preventDefault();


        setMensaje("");



        if(!validarFormulario()){

            return;

        }



        setCargando(true);



        try{


            const response = await api.post(

                "/register",

                form

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
                "Cuenta creada correctamente"
            );



        }catch(error){



            console.log(error.response?.data);



            if(error.response?.data?.errors){


                setErrores(
                    error.response.data.errors
                );


            }



            setMensaje(

                error.response?.data?.message ??

                "Error al registrar"

            );



        }finally{


            setCargando(false);


        }


    };









    return(


        <div className="login-card register-card">



            <h2>
                Crear cuenta
            </h2>



            <p className="subtitle">
                Regístrate para comenzar a comprar
            </p>





            <form onSubmit={handleSubmit}>


                <div className="input-group">

                    <User/>


                    <input

                        name="name"

                        placeholder="Nombre completo"

                        value={form.name}

                        onChange={handleChange}

                    />

                </div>



                {
                    errores.name &&

                    <small className="error">

                        {errores.name[0]}

                    </small>
                }







                <div className="input-group">


                    <Mail/>


                    <input

                        name="email"

                        type="email"

                        placeholder="Correo electrónico"

                        value={form.email}

                        onChange={handleChange}

                    />

                </div>



                {
                    errores.email &&

                    <small className="error">

                        {errores.email[0]}

                    </small>
                }







                <div className="input-group">


                    <Lock/>


                    <input

                        name="password"

                        type={
                            mostrarPassword
                            ? "text"
                            : "password"
                        }

                        placeholder="Contraseña"

                        value={form.password}

                        onChange={handleChange}

                    />



                    <button

                        type="button"

                        className="eye-btn"

                        onClick={()=>setMostrarPassword(!mostrarPassword)}

                    >

                        {
                            mostrarPassword
                            ? <EyeOff/>
                            : <Eye/>
                        }


                    </button>


                </div>





                {
                    errores.password &&

                    <small className="error">

                        {errores.password[0]}

                    </small>

                }







                <div className="input-group">


                    <Lock/>


                    <input

                        name="password_confirmation"

                        type={
                            mostrarConfirmar
                            ? "text"
                            : "password"
                        }

                        placeholder="Confirmar contraseña"

                        value={form.password_confirmation}

                        onChange={handleChange}

                    />




                    <button

                        type="button"

                        className="eye-btn"

                        onClick={()=>setMostrarConfirmar(!mostrarConfirmar)}

                    >

                        {
                            mostrarConfirmar
                            ? <EyeOff/>
                            : <Eye/>
                        }


                    </button>


                </div>





                {
                    errores.password_confirmation &&

                    <small className="error">

                        {errores.password_confirmation[0]}

                    </small>

                }








                <button

                    type="submit"

                    disabled={cargando}

                >

                    {
                        cargando

                        ? "Registrando..."

                        : "Registrarse"
                    }


                </button>





            </form>






            {
                mensaje &&


                <p className={

                    mensaje.includes("correctamente")

                    ? "success"

                    : "error-message"

                }>


                    {mensaje}


                </p>

            }



        </div>


    );


}