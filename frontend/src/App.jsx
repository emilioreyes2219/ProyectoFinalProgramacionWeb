import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import Login from "./pages/auth/Login";

import Dashboard from "./pages/dashboard/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route element={<AuthLayout />}>

                <Route
                    path="/login"
                    element={<Login />}
                />

            </Route>

            <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>

            <Route

                path="*"

                element={<Navigate to="/login" replace />}

            />

        </Routes>

    );

}

export default App;