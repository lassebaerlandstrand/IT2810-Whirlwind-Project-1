import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Location } from '../types/api-types';
import LOCATIONS from '../utils/locations';

type OptionsType = {
  [key: string]: (a: Location, b: Location) => number;
};

export const options: OptionsType = {
  'City Name': (a: Location, b: Location) => a.city_name.localeCompare(b.city_name),
  'Country Name': (a: Location, b: Location) => a.country_name.localeCompare(b.country_name),
};

interface LocationContextProps {
  sortedLocations: Location[];
  setSortCondition: (sortCondition: () => (a: Location, b: Location) => number) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sortedLocations, setSortedLocations] = useState<Location[]>(LOCATIONS);
  const [sortCondition, setSortCondition1] = useState<() => (a: Location, b: Location) => number>(
    () => Object.values(options)[1],
  );

  // const sortLocations = useCallback(() => {
  //   let sortedData = [...LOCATIONS];
  //   if (sortCondition) {
  //     sortedData.sort(sortCondition());
  //   }
  //   setSortedLocations(sortedData);
  // }, [sortCondition]);

  // useEffect(() => {
  //   sortLocations();
  // }, [sortCondition, sortLocations]);

  const setSortCondition = () => (sortCondition: (a: Location, b: Location) => number) => {};

  return <LocationContext.Provider value={{ sortedLocations, setSortCondition }}>{children}</LocationContext.Provider>;
};

export const useLocations = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocations must be used within a LocationProvider');
  }
  return context;
};
