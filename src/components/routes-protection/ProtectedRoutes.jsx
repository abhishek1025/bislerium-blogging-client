import { useEffect } from "react";
import useUserAuthContext from "../../utils/hooks/useUserAuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuthTokenFromCookie } from "../../utils";

const ProtectedRoutes = () => {
    const { authToken } = useUserAuthContext();
    const authTokenFromCookie = getAuthTokenFromCookie();

    useEffect(() => {
        if (!authTokenFromCookie && !authToken) {
            toast.warning("You need to login to access this page.", {
                theme: "dark",
            });
        }
    }, [authToken, authTokenFromCookie]);

    return authToken || authTokenFromCookie ? (
        <Outlet />
    ) : (
        <Navigate to="/authentication" />
    );
};

export default ProtectedRoutes;
