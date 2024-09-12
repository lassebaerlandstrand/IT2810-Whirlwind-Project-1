import {useQuery} from '@tanstack/react-query';
import {fetchWeather} from '../clients/weatherClient';

// Custom hook using the query key
export const useWeatherQuery = (lat: string, lon: string) => {
  return useQuery({
    queryKey: [lat, lon], // Query key for caching and invalidation
    queryFn: () => fetchWeather(lat, lon).then((data) => data.properties.timeseries[0].data.instant.details),
  });
};
