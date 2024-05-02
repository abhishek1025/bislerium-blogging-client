import { useEffect } from 'react';
import useUserAuthContext from '../../utils/hooks/useUserAuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuthTokenFromCookie, showNotification } from '../../utils';

const ProtectedRoutes = () => {
  const { authToken } = useUserAuthContext();
  const authTokenFromCookie = getAuthTokenFromCookie();

  useEffect(() => {
    if (!authTokenFromCookie && !authToken) {
      showNotification({
        title: 'Authentication Required',
        icon: 'warning',
        message: 'You need to login to access this page',
      });
    }
  }, [authToken, authTokenFromCookie]);

  return authToken || authTokenFromCookie ? (
    <Outlet />
  ) : (
    <Navigate to='/authentication' />
  );
};

export default ProtectedRoutes;

