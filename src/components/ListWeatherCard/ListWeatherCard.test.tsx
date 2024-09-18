import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { vi } from 'vitest'; // Correct import for vi
import { useWeather } from '../../hooks/useWeather';
import LOCATIONS from '../../utils/locations';
import ListWeatherCard from './ListWeatherCard';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../hooks/useWeather');

const location = LOCATIONS[0];

describe('ListWeatherCard', () => {
  const mockNavigate = vi.fn();
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders loading state', () => {
    (useWeather as jest.Mock).mockReturnValue({ isLoading: true });

    render(<ListWeatherCard location={location} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders weather data', () => {
    (useWeather as jest.Mock).mockReturnValue({
      data: {
        air_temperature: 20,
        cloud_area_fraction: 0.4,
        precipitation_amount: 0,
      },
      isLoading: false,
      error: false,
    });

    render(<ListWeatherCard location={location} />);

    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useWeather as jest.Mock).mockReturnValue({ error: true });

    render(<ListWeatherCard location={location} />);

    expect(screen.getByText(`Error fetching data for ${location.city_name}`)).toBeInTheDocument();
  });

  it('navigates to location details on click', () => {
    (useWeather as jest.Mock).mockReturnValue({
      data: {
        air_temperature: 20,
        cloud_area_fraction: 0.4,
        precipitation_amount: 0,
      },
      isLoading: false,
      error: false,
    });

    render(<ListWeatherCard location={location} />);

    const weatherCard = screen.getByRole('button');
    fireEvent.click(weatherCard);

    expect(mockNavigate).toHaveBeenCalledWith(`/location/${location.city_name}`);
  });
});
