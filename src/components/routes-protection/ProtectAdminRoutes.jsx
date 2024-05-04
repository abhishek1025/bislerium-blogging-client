import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserAuthContext } from '../../utils';

const ProtectAdminRoutes = () => {
  const { authToken, currentUser } = useUserAuthContext();

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      toast.warning('You do not have permission to access this feature.', {
        theme: 'dark',
      });
    }
  }, [authToken, currentUser?.isAdmin]);

  return currentUser?.isAdmin ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectAdminRoutes;

