import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import {Navigate, Outlet} from "react-router-dom";

const AdminRoute = ({children}) => {

    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children ? children : <Outlet />;
};

export default AdminRoute;