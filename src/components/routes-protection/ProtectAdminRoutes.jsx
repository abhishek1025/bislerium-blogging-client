import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserAuthContext } from "../../utils";

const ProtectAdminRoutes = () => {
    const { authToken, currentUser } = useUserAuthContext();
    const isAdmin = currentUser?.role === "admin";

    useEffect(() => {
        if (!isAdmin) {
            toast.warning("You do not have permission to access this feature.", {
                theme: "dark",
            });
        }
    }, [authToken, isAdmin]);

    return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectAdminRoutes;
