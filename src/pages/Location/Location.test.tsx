import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { vi } from 'vitest';
import { useWeather } from '../../hooks/useWeather';
import Location from '../Location/Location'; // Adjust the import based on your structure

// Mock the necessary modules
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('../../hooks/useWeather', () => ({
  useWeather: vi.fn(),
}));

describe('Location Component', () => {
  it('renders correctly with mock data', () => {
    // Mock the route parameter `useParams`
    (useParams as jest.Mock).mockReturnValue({ locationName: 'Tokyo' });

    const mockWeatherData = {
      air_pressure_at_sea_level: 0,
      air_temperature: 15,
      cloud_area_fraction: 0.7,
      relative_humidity: 0,
      wind_from_direction: 0,
      wind_speed: 0,
      precipitation_amount: 0.3,
    };

    // Mock the useWeather hook to return some weather data
    (useWeather as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    render(<Location />);

    // Check that wind direction and precipitation are displayed correctly
    expect(screen.getByText('Wind (N)')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByText('Rain')).toBeInTheDocument();
  });

  it('shows loading state when data is loading', () => {
    // Mock useParams for the route parameter
    (useParams as jest.Mock).mockReturnValue({ locationName: 'Tokyo' });

    // Mock useWeather to simulate loading state
    (useWeather as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    // Render the component
    render(<Location />);

    // Check that the component is in a loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
