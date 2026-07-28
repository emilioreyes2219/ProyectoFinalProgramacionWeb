import { Outlet } from "react-router-dom";

export default function AuthLayout(){

    return(
        <div className="auth-container">

            <div className="auth-image">

                <div className="overlay">

                    <h1>
                        Bienvenido a nuestra tienda
                    </h1>

                    <p>
                        Encuentra productos únicos
                        con la mejor experiencia de compra.
                    </p>

                </div>

            </div>


            <div className="auth-content">

                <Outlet />

            </div>


        </div>
    )
}