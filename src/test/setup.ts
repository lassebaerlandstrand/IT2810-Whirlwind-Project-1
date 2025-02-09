import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock useFavorites context globally
vi.mock('../contexts/FavoritesFunctions', async (importOriginal) => {
  const actual = await importOriginal();

  // Just to keep TypeScript happy
  if (typeof actual !== 'object' || actual === null) {
    throw new Error('Expected an object');
  }

  return {
    ...actual,
    useFavorites: vi.fn(() => ({
      favorites: [],
      toggleFavorite: vi.fn(),
    })),
  };
});

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
