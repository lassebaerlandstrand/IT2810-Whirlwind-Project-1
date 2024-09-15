// Had to extract to a serparate file to fix eslint warning
import { Location } from '../../types/api-types';

type OptionsType = {
  [key: string]: (a: Location, b: Location) => number;
};

// TODO: Add more sorting options
export const options: OptionsType = {
  Alphabetically: (a: Location, b: Location) => a.city_name.localeCompare(b.city_name),
  Country: (a: Location, b: Location) => a.country_name.localeCompare(b.country_name),
};
