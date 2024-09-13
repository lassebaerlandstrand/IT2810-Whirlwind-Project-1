import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Location} from '../../types/api-types';
import getWeatherInfo from '../../utils/weatherUtils'; // Adjust path to where `getWeatherInfo` is located
import WeatherCard from './WeatherCard';

// Mock getWeatherInfo
jest.mock('../../utils/weatherUtils', () => ({
  getWeatherInfo: jest.fn(),
}));

describe('WeatherCard', () => {
  const mockGetWeatherInfo = getWeatherInfo as jest.Mock;

  const location: Location = {
    city_name: 'New York',
    country_name: 'USA',
    latitude: 40.7128,
    longitude: -74.006,
  };

  it('should render cloud icon if cloud_area_fraction > 0.5', () => {
    mockGetWeatherInfo.mockReturnValue({
      air_pressure_at_sea_level: 1000,
      air_temperature: 22,
      cloud_area_fraction: 0.7,
      relative_humidity: 0.2,
      wind_from_direction: 190,
      wind_speed: 2,
    });

    render(<WeatherCard {...location} />);

    // Check if the cloud icon is rendered
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
    expect(screen.queryByText('Sunny')).toBeNull();
  });

  it('should render sun icon if cloud_area_fraction <= 0.5', () => {
    mockGetWeatherInfo.mockReturnValue({
      air_pressure_at_sea_level: 1000,
      air_temperature: 22,
      cloud_area_fraction: 0.3,
      relative_humidity: 0.2,
      wind_from_direction: 190,
      wind_speed: 2,
    });

    render(<WeatherCard {...location} />);

    // Check if the sun icon is rendered
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.queryByText('Cloudy')).toBeNull();
  });

  it('should display correct temperature and city info', () => {
    mockGetWeatherInfo.mockReturnValue({
      air_pressure_at_sea_level: 1000,
      air_temperature: 22,
      cloud_area_fraction: 0.3,
      relative_humidity: 0.2,
      wind_from_direction: 190,
      wind_speed: 2,
    });

    render(<WeatherCard {...location} />);

    // Check for city name and temperature
    expect(screen.getByText('New York, USA')).toBeInTheDocument();
    expect(screen.getByText('22°C')).toBeInTheDocument();
  });
});
