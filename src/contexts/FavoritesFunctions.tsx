import { useContext } from 'react';
import { FavoritesContext } from './FavoritesContext';

// Had to extract to a serparate file to fix eslint warning
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
