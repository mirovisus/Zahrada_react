import { createContext, useContext } from 'react';

export const GardensContext = createContext(null);

export const useGardens = () => {
  const context = useContext(GardensContext);

  if (!context) {
    throw new Error('useGardens musí být použit uvnitř GardensProvideru');
  }

  return context;
};
