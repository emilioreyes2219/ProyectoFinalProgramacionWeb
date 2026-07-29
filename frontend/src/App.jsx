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


import ProtectedRoute from "./components/ProtectedRoute";
function App() {

    return (

        <Routes>

            {/* Rutas públicas */}
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


<Route
    path="/productos"
    element={<Productos />}
/>

            </Route>

            {/* Redirección por defecto */}
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>

    );

}

export default App;