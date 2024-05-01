/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthTokenFromCookie } from '../utils/handleCookies';
import { SERVER_URL } from '../config';

export const UserAuthContext = createContext({
  currentUser: {},
  setCurrentUser: () => null,
  authToken: '',
  setAuthToken: () => null,
});

export const UserAuthContextProvider = ({ children }) => {
  const authTokenFromCookie = getAuthTokenFromCookie();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(authTokenFromCookie);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!authToken) {
        return;
      }

      const res = await fetch(`${SERVER_URL}/v1/user/getUserDetail`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const resMsg = await res.json();

      if (res.ok) {
        const _user = resMsg.data;

        setCurrentUser(_user);

        if (_user.role === 'admin') {
          navigate('/dashboard');
        }

        return;
      }

      setCurrentUser(null);
    };

    fetchUserInfo();
  }, [authToken]);

  const value = {
    currentUser,
    setCurrentUser,
    authToken,
    setAuthToken,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

