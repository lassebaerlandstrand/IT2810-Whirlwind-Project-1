import '@testing-library/jest-dom';
import {vi} from 'vitest';

// Mock the useWeatherQuery hook globally
vi.mock('../api/clients/weatherClient', () => ({
  fetchWeather: vi.fn().mockResolvedValue({
    properties: {
      timeseries: [
        {
          data: {
            instant: {
              details: {
                air_pressure_at_sea_level: 10,
                air_temperature: 10,
                cloud_area_fraction: 10,
                relative_humidity: 10,
                wind_from_direction: 10,
                wind_speed: 10,
              },
            },
            next_1_hours: {
              details: {
                precipitation_amount: 10,
              },
            },
          },
        },
      ],
    },
  }),
}));
