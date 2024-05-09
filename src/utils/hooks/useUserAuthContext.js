import { useContext } from 'react';
import { UserAuthContext } from '../../contexts/UserAuthContext';

const useUserAuthContext = () => {
  const {
    currentUser,
    setCurrentUser,
    authToken,
    setAuthToken,
    sendNotification,
  } = useContext(UserAuthContext);

  return {
    currentUser,
    setCurrentUser,
    authToken,
    setAuthToken,
    sendNotification,
  };
};

export default useUserAuthContext;

