import {useWeatherQuery} from '../api/queries/weather';

export const useWeather = (lat: string, lon: string) => {
  const {data, error, isLoading} = useWeatherQuery(lat, lon);
  return {data, error, isLoading};
};
