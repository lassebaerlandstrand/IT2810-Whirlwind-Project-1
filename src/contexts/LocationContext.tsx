import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Location } from '../types/api-types';
import LOCATIONS from '../utils/locations';
import { useFavorites } from './FavoritesFunctions';

type OptionsType = {
  [key: string]: (a: Location, b: Location) => number;
};

export const options: OptionsType = {
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
    () => sessionStorage.getItem('SortingOption') || Object.keys(options)[0],
  );

  // Every time the sortKey changes, sort the locations. Sort first by favorites, then by the selected sort option.
  const sortLocations = useCallback(() => {
    if (sortKey) {
      let sortedData = [...LOCATIONS];
      sortedData.sort((a, b) => {
        const isAFavorited = favorites.some((fav) => fav.city_name === a.city_name);
        const isBFavorited = favorites.some((fav) => fav.city_name === b.city_name);

        if (isAFavorited !== isBFavorited) {
          return isAFavorited ? -1 : 1;
        }

        return options[sortKey](a, b);
      });
      setSortedLocations(sortedData);
    }
  }, [sortKey]);

  useEffect(() => {
    sortLocations();
  }, [sortKey, sortLocations]);

  return <LocationContext.Provider value={{ sortedLocations, setSortKey }}>{children}</LocationContext.Provider>;
};

export const useLocations = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocations must be used within a LocationProvider');
  }
  return context;
};
