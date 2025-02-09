import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Location } from '../types/api-types';

interface FavoritesContextProps {
  favorites: Location[];
  toggleFavorite: (location: Location) => void;
}

export const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Location[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (location: Location) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (fav) => fav.city_name === location.city_name && fav.country_name === location.country_name,
      );
      if (isFavorite) {
        return prevFavorites.filter(
          (fav) => fav.city_name !== location.city_name || fav.country_name !== location.country_name,
        );
      } else {
        return [...prevFavorites, location];
      }
    });
  };

  return <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoritesContext.Provider>;
};
