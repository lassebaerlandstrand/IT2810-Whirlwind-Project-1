import {Location, WeatherInfo} from '../types/api-types';

// TODO: Use API instead
/**
 * Retrieves weather information for a given location.
 * @param location - The location for which to retrieve weather information.
 * @returns The weather information object containing various weather parameters.
 */
const getWeatherInfo = (location: Location): WeatherInfo => {
  return {
    air_pressure_at_sea_level: 1000,
    air_temperature: 20,
    cloud_area_fraction: 0.5,
    relative_humidity: 50,
    wind_from_direction: 180,
    wind_speed: 10,
  };
};

export default getWeatherInfo;
