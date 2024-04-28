import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserAuthContext } from "../../utils";

const AuthorizeRoute = ({
    children,
    pathToNavigateIfNotAuthorized,
    notAllowedRoles = ["admin"],
    message = "You do not have permission to access this feature.",
}) => {
    const { currentUser } = useUserAuthContext();

    useEffect(() => {
        if (notAllowedRoles.includes(currentUser?.role)) {
            toast.warning(message, {
                theme: "dark",
            });
        }
    }, [notAllowedRoles, currentUser?.role, message]);

    if (notAllowedRoles.includes(currentUser?.role)) {
        return <Navigate to={pathToNavigateIfNotAuthorized} />;
    }

    return children;
};

export default AuthorizeRoute;
