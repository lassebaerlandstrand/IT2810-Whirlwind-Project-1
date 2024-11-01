import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Location } from '../types/api-types';
import LOCATIONS from '../utils/locations';
import { useFavorites } from './FavoritesFunctions';

type OptionsType = {
  [key: string]: (a: Location, b: Location) => number;
};

export const sortingOptions: OptionsType = {
  'City Name': (a: Location, b: Location) => a.city_name.localeCompare(b.city_name),
  'Country Name': (a: Location, b: Location) => a.country_name.localeCompare(b.country_name),
};

interface LocationContextProps {
  sortedLocations: Location[];
  setSortKey: (sortKey: keyof OptionsType) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sortedLocations, setSortedLocations] = useState<Location[]>(LOCATIONS);
  const { favorites } = useFavorites();
  const [sortKey, setSortKey] = useState<keyof OptionsType>(
    () => sessionStorage.getItem('SortingOption') || Object.keys(sortingOptions)[0],
  );

  const location = useLocation();

  // Every time the sortKey changes, sort the locations. Sort first by favorites, then by the selected sort option.
  const sortLocations = useCallback(() => {
    if (location.pathname == '/' && sortKey) {
      let sortedData = [...LOCATIONS];
      sortedData.sort((first, second) => {
        const isFirstFavorited = favorites.some((fav) => fav.city_name === first.city_name);
        const isSecondFavorited = favorites.some((fav) => fav.city_name === second.city_name);

        if (isFirstFavorited !== isSecondFavorited) {
          return isFirstFavorited ? -1 : 1;
        }

        return sortingOptions[sortKey](first, second);
      });
      setSortedLocations(sortedData);
    }
  }, [sortKey, JSON.stringify(favorites), location.pathname]);

  useEffect(() => {
    sortLocations();
  }, [sortKey, sortLocations, JSON.stringify(favorites)]);

  return <LocationContext.Provider value={{ sortedLocations, setSortKey }}>{children}</LocationContext.Provider>;
};

export const useLocations = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocations must be used within a LocationProvider');
  }
  return context;
};
