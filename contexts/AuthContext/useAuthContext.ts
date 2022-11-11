import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined || authContext === null) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return authContext;
};
