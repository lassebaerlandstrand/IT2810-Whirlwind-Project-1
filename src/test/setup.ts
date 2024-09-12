import {vi} from 'vitest';

// Mock the fetchWeather hook globally
vi.mock('../api/clients/weatherClient', () => ({
  fetchWeather: vi.fn().mockReturnValue({
    data: {
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
            },
          },
        ],
      },
    },
  }),
}));
