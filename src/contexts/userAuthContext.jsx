/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "../utils/handleCookies";

export const UserAuthContext = createContext({
    currentUser: {},
    setCurrentUser: () => null,
    authToken: "",
    setAuthToken: () => null,
});

export const UserAuthContextProvider = ({ children }) => {
    const authTokenFromCookie = getAuthTokenFromCookie();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);
    const [authToken, setAuthToken] = useState(authTokenFromCookie);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!authToken) {
                return;
            }

            setIsLoading(true);

            const res = await fetch("/api/users/me", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            setIsLoading(false);

            const resMsg = await res.json();

            if (res.ok) {
                const _user = resMsg.data;

                setCurrentUser(_user);

                if (_user.role === "admin") {
                    navigate("/dashboard");
                }

                return;
            }

            setCurrentUser(null);
        };

        fetchUserInfo();
    }, [authToken]);

    const value = { currentUser, setCurrentUser, authToken, setAuthToken, isLoading };

    return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
};
