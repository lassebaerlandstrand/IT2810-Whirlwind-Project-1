import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useWeatherQuery } from './weather';

it('should return weather data when (mocked) fetchWeather is successful', async () => {
  const mockWeatherDetails = {
    air_pressure_at_sea_level: 10,
    air_temperature: 10,
    cloud_area_fraction: 10,
    relative_humidity: 10,
    wind_from_direction: 10,
    wind_speed: 10,
    precipitation_amount: 10,
  };

  const queryClient = new QueryClient();
  const { result } = renderHook(() => useWeatherQuery('59.91', '10.75'), {
    wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(mockWeatherDetails);
});
