import { useContext } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";

const useUserAuthContext = () => {
    const { currentUser, setCurrentUser, authToken, setAuthToken } =
        useContext(UserAuthContext);

    return { currentUser, setCurrentUser, authToken, setAuthToken };
};

export default useUserAuthContext;
