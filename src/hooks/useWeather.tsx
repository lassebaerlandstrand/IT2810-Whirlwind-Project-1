import { useWeatherQuery } from '../api/queries/weather';
import { Location, WeatherInfo } from '../types/api-types';

export const useWeather = (
  location: Location,
): { data: WeatherInfo | null; error: Error | unknown; isLoading: boolean } => {
  const { data, error, isLoading } = useWeatherQuery(location.latitude, location.longitude);

  return {
    data: typeof data === 'undefined' ? null : data,
    error,
    isLoading,
  };
};
