import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/dashboard/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";


function App() {

    return (

        <Routes>

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


            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>

    );

}


export default App;