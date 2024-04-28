import { useNavigate } from "react-router-dom";
import useUserAuthContext from "./useUserAuthContext";
import { getRequest } from "../api";
import { removeCookie } from "../handleCookies";
import { toast } from "react-toastify";
import { showNotification } from "../alerts";

const useHandleLogOut = () => {
    const { setAuthToken, setCurrentUser } = useUserAuthContext();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await getRequest({ endpoint: "/auth/logout" });

        setAuthToken(null);
        setCurrentUser(null);
        removeCookie();

        navigate("/authentication");

        showNotification({
            message: "You have been logged out.",
            type: "success",
            icon: "success",
        });
    };

    return handleLogOut;
};

export default useHandleLogOut;
