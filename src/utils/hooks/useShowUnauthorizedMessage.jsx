import { showNotification } from '../alerts';
import useUserAuthContext from './useUserAuthContext';

const useShowUnauthorizedMessage = () => {
  const { currentUser, authToken } = useUserAuthContext();

  const displayUnauthorizedMessage = () => {
    if (!currentUser || !authToken) {
      showNotification({
        title: 'Unauthorized',
        message: 'You are need to log in to perform this action',
        icon: 'error',
      });

      return true;
    }
  };

  return displayUnauthorizedMessage;
};

export default useShowUnauthorizedMessage;

