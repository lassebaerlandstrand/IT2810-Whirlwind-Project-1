// In this file we define the structure of the data from the API

export type WeatherInfo = {
  air_pressure_at_sea_level: number; //hPa
  air_temperature: number; //Celsius
  cloud_area_fraction: number; //%
  relative_humidity: number; //%
  wind_from_direction: number; //degrees, 0 - wind from north, 90 - wind from east...
  wind_speed: number; //m/s
  precipitation_amount: number; //mm
};

export type Location = {
  city_name: string;
  country_name: string;
  latitude: string;
  longitude: string;
};
