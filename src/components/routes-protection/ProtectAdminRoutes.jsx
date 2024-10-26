import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserRole, useUserAuthContext } from '../../utils';

const ProtectAdminRoutes = () => {
  const role = getUserRole();

  useEffect(() => {
    if (role !== 'admin') {
      toast.warning('You do not have permission to access this feature.', {
        theme: 'dark',
      });
    }
  }, [role]);

  return role === 'admin' ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectAdminRoutes;

