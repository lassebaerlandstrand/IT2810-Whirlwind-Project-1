import {useQuery} from '@tanstack/react-query';
import {WeatherInfo} from '../../types/api-types';

import {fetchWeather} from '../clients/weatherClient';

// Custom hook using the query key
export const useWeatherQuery = (lat: string, lon: string) => {
  return useQuery({
    queryKey: [lat, lon], // Query key for caching
    queryFn: () =>
      fetchWeather(lat, lon).then(
        (data): WeatherInfo => ({
          air_pressure_at_sea_level: data.properties.timeseries[0].data.instant.details.air_pressure_at_sea_level,
          air_temperature: data.properties.timeseries[0].data.instant.details.air_temperature,
          cloud_area_fraction: data.properties.timeseries[0].data.instant.details.cloud_area_fraction,
          relative_humidity: data.properties.timeseries[0].data.instant.details.relative_humidity,
          wind_from_direction: data.properties.timeseries[0].data.instant.details.wind_from_direction,
          wind_speed: data.properties.timeseries[0].data.instant.details.wind_speed,
          precipitation_amount: data.properties.timeseries[0].data.next_1_hours.details.precipitation_amount,
        }),
      ),
  });
};
