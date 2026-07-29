import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser } from "../services/auth";


export default function ProtectedRoute({
    allowedRoles = [],
}) {


    const token = getToken();

    const user = getUser();



    if (!token || !user) {

        return <Navigate to="/login" replace />;

    }



    if (

        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)

    ) {

        return <Navigate to="/login" replace />;

    }



    return <Outlet />;

}