export type WeatherInfo = {
  air_pressure_at_sea_level: number; //hPa
  air_temperature: number; //celsius
  cloud_area_fraction: number; //%
  relative_humidity: number; //%
  wind_from_direction: number; //0 degree - north, 90 - east, 180 - south, 270 - west
  wind_speed: number; //m/s
  precipitation_amount: number; //mm
};
