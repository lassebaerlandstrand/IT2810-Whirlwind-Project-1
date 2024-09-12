import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {renderHook, waitFor} from '@testing-library/react'; // Import waitFor from @testing-library/react
import {useWeatherQuery} from './weather'; // Adjust this import based on your folder structure

describe('useWeatherQuery', () => {
  const queryClient = new QueryClient();

  const wrapper = ({children}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

  it('should return mocked weather data', async () => {
    const lat = '60';
    const lon = '10';

    // Use renderHook from @testing-library/react to test the hook
    const {result} = renderHook(() => useWeatherQuery(lat, lon), {wrapper});

    // Wait for the query to finish loading (react-query async state management)
    await waitFor(() => result.current.isSuccess);

    console.log(result);

    // Expect the data to match the mocked data
    expect(result.current.data).toEqual({
      air_pressure_at_sea_level: 10,
      air_temperature: 10,
      cloud_area_fraction: 10,
      relative_humidity: 10,
      wind_from_direction: 10,
      wind_speed: 10,
    });

    // Ensure no error was thrown
    expect(result.current.isError).toBe(false);
  });
});
