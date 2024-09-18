import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import LOCATIONS from '../utils/locations';
import { useWeather } from './useWeather'; // Adjust the path accordingly

// Helper to create a wrapper for the QueryClientProvider
const createQueryClientWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useWeather', () => {
  it('should return weather data successfully', async () => {
    // Render the hook within a QueryClientProvider
    const { result } = renderHook(() => useWeather(LOCATIONS[0]), {
      wrapper: createQueryClientWrapper(),
    });

    // Initially, it should be loading
    expect(result.current.isLoading).toBe(true);

    // Wait for the hook to fetch the data
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check that the correct data is returned
    expect(result.current.data).toEqual({
      air_pressure_at_sea_level: 10,
      air_temperature: 10,
      cloud_area_fraction: 10,
      relative_humidity: 10,
      wind_from_direction: 10,
      wind_speed: 10,
      precipitation_amount: 10,
    });
  });
});
