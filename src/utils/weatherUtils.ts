import {Location, WeatherInfo} from '../types/api-types';

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
