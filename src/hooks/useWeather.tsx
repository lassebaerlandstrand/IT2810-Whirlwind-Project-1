import {useWeatherQuery} from '../api/queries/weather';
import {WeatherInfo} from '../types/weather-info';

export const useWeather = (
  lat: string,
  lon: string,
): {data: WeatherInfo | undefined; error: Error | unknown; isLoading: boolean} => {
  const {data, error, isLoading} = useWeatherQuery(lat, lon);
  return {data, error, isLoading};
};
