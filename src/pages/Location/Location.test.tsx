import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { vi } from 'vitest';
import { useWeather } from '../../hooks/useWeather';
import Location from './Location';

// Mock useWeather and useParams
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('../../hooks/useWeather', () => ({
  useWeather: vi.fn(),
}));

describe('Location component', () => {
  const mockWeatherData = {
    wind_speed: 10,
    wind_from_direction: 0,
    precipitation_amount: 5,
  };

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ locationName: 'Tokyo' });
  });

  it('should render loading state when data is being fetched', () => {
    (useWeather as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<Location />);

    // Check if loading UI appears
    expect(screen.getByText(/--.-/i)).toBeInTheDocument();
  });

  it('should render weather information correctly when data is available', () => {
    (useWeather as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    render(<Location />);

    // Check if wind info and rain info are displayed correctly
    expect(screen.getByText('Wind (N)')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
