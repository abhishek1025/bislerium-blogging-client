import { useContext } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";

const useUserAuthContext = () => {
    const { currentUser, setCurrentUser, authToken, setAuthToken, isLoading } =
        useContext(UserAuthContext);

    return { currentUser, setCurrentUser, authToken, setAuthToken, isLoading };
};

export default useUserAuthContext;
