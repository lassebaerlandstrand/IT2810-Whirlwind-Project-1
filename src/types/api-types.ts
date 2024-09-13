// In this file we define the structure of the data from the API

export type WeatherInfo = {
  air_pressure_at_sea_level: number;
  air_temperature: number;
  cloud_area_fraction: number;
  relative_humidity: number;
  wind_from_direction: number;
  wind_speed: number;
};

export type Location = {
  city_name: string;
  country_name: string;
  latitude: number;
  longitude: number;
}
