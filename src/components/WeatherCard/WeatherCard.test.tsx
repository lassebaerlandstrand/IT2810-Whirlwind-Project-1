import {render, screen} from '@testing-library/react';
import {vi} from 'vitest'; // Vite's version of mocking
import {useWeather} from '../../hooks/useWeather';
import WeatherCard from './WeatherCard';
import LOCATIONS from '../../utils/locations';

// Mock the useWeather hook
vi.mock('../../hooks/useWeather');

// Sample location data for the test
const location = LOCATIONS[0];

// Helper to mock the return values of useWeather
const mockUseWeather = (data: unknown, error: boolean = false, isLoading: boolean = false) => {
  (useWeather as jest.Mock).mockReturnValue({
    data,
    error,
    isLoading,
  });
};

describe('WeatherCard', () => {
  it('renders loading state', () => {
    // Mock loading state
    mockUseWeather(null, false, true);

    render(<WeatherCard {...location} />);

    // Check if loading spinner is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('New York, USA')).toBeInTheDocument();
    expect(screen.getByText('---°C')).toBeInTheDocument();
  });

  it('renders sunny weather', () => {
    // Mock sunny weather
    mockUseWeather({air_temperature: 25, cloud_area_fraction: 0.3});

    render(<WeatherCard {...location} />);

    // Check if sunny icon and text are displayed
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  it('renders cloudy weather', () => {
    // Mock cloudy weather
    mockUseWeather({air_temperature: 15, cloud_area_fraction: 0.7});

    render(<WeatherCard {...location} />);

    // Check if cloudy icon and text are displayed
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
  });

  it('handles API error', () => {
    // Mock an error state
    mockUseWeather(null, true);

    render(<WeatherCard {...location} />);

    // Check if loading state is still displayed due to error
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});