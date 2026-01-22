import { useContext } from 'react';
import AuthContext from './AuthContext';

// Custom hook pro snadné použití AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth musí být použit uvnitř AuthProvider');
  }

  return context;
};

export default useAuth;