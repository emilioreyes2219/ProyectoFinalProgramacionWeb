import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/auth/Login";
<<<<<<< HEAD
import Register from "./pages/auth/Register";

=======
>>>>>>> 23c4346 (Listado de categorias)
import Dashboard from "./pages/dashboard/Dashboard";
import Categorias from "./pages/categorias/Categorias";

import ProtectedRoute from "./components/ProtectedRoute";

<<<<<<< HEAD
import DashboardLayout from "./layouts/DashboardLayout";


=======
>>>>>>> 23c4346 (Listado de categorias)
function App() {

    return (

        <Routes>

<<<<<<< HEAD
=======
            {/* Rutas públicas */}
>>>>>>> 23c4346 (Listado de categorias)
            <Route element={<AuthLayout />}>

                <Route
                    path="/login"
                    element={<Login />}
                />

<<<<<<< HEAD
                <Route
                    path="/register"
                    element={<Register />}
                />

            </Route>


            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

            </Route>


=======
            </Route>

            {/* Rutas protegidas */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
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

            {/* Redirección por defecto */}
>>>>>>> 23c4346 (Listado de categorias)
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>

    );

}


export default App;