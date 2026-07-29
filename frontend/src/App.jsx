import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";


import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";


import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";


import Dashboard from "./pages/dashboard/Dashboard";

import Categorias from "./pages/categorias/Categorias";

import Productos from "./pages/productos/Productos";

import Pedidos from "./pages/pedidos/Pedidos";

import Catalogo from "./pages/cliente/Catalogo";

import VendedorDashboard from "./pages/vendedor/VendedorDashboard";
import MisPedidos from "./pages/cliente/MisPedidos";
import Carrito from "./pages/cliente/Carrito";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {


    return (


        <Routes>



            {/* =====================
                RUTAS PUBLICAS
            ====================== */}


            <Route element={<AuthLayout />}>


                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />


            </Route>






            {/* =====================
                ADMIN
            ====================== */}


            <Route

                element={

                    <ProtectedRoute
                        allowedRoles={["admin"]}
                    />

                }

            >


                <Route
                    element={<DashboardLayout />}
                >


                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />


                    <Route
                        path="/categorias"
                        element={<Categorias />}
                    />


                </Route>


            </Route>







            {/* =====================
                ADMIN + VENDEDOR
            ====================== */}


            <Route

                element={

                    <ProtectedRoute

                        allowedRoles={[
                            "admin",
                            "vendedor"
                        ]}

                    />

                }

            >


                <Route

                    element={<DashboardLayout />}

                >



                    <Route

                        path="/productos"

                        element={<Productos />}

                    />



                    <Route

                        path="/pedidos"

                        element={<Pedidos />}

                    />



                </Route>


            </Route>







            {/* =====================
                VENDEDOR
            ====================== */}


            <Route

                element={

                    <ProtectedRoute

                        allowedRoles={[
                            "vendedor"
                        ]}

                    />

                }

            >


                <Route

                    element={<DashboardLayout />}

                >



                    <Route

                        path="/vendedor"

                        element={<VendedorDashboard />}

                    />


                </Route>


            </Route>







            {/* =====================
                CLIENTE
            ====================== */}

<Route
    element={
        <ProtectedRoute
            allowedRoles={[
                "cliente"
            ]}
        />
    }
>


    <Route
        element={<DashboardLayout />}
    >



        <Route
            path="/catalogo"
            element={<Catalogo />}
        />



        <Route
            path="/carrito"
            element={<Carrito />}
        />



        <Route
            path="/mis-pedidos"
            element={<MisPedidos />}
        />


    </Route>


</Route>
              







            {/* =====================
                DEFAULT
            ====================== */}


            <Route

                path="*"

                element={

                    <Navigate

                        to="/login"

                        replace

                    />

                }

            />



        </Routes>


    );

}


export default App;