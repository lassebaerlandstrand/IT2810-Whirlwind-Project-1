import {describe, expect, it} from 'vitest';
import {fetchWeather} from './weatherClient';

describe('Testing that fetchWeather mocks properly', () => {
  it('should return mocked weather data', async () => {
    const mockResponse = {
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
    };

    const result = await fetchWeather('10.10', '10.10');

    // Assert
    expect(result).toEqual(mockResponse);
    expect(result.properties.timeseries[0].data.instant.details.air_temperature).toBe(10);
  });
});
