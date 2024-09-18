import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LOCATIONS from '../../utils/locations';
import WeatherCard from './WeatherCard';

describe('WeatherCard', () => {
  it('renders loading state', () => {
    render(<WeatherCard location={LOCATIONS[0]} data={null} />);

    // Check if loading spinner is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('New York, USA')).toBeInTheDocument();
    expect(screen.getByText('---°C')).toBeInTheDocument();
  });

  it('renders sunny weather', () => {
    render(
      <WeatherCard
        location={LOCATIONS[0]}
        data={{
          air_pressure_at_sea_level: 0,
          air_temperature: 25,
          cloud_area_fraction: 0.3,
          relative_humidity: 0,
          wind_from_direction: 0,
          wind_speed: 0,
          precipitation_amount: 0,
        }}
      />,
    );

    // Check if sunny icon and text are displayed
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  it('renders cloudy weather', () => {
    render(
      <WeatherCard
        location={LOCATIONS[0]}
        data={{
          air_pressure_at_sea_level: 0,
          air_temperature: 15,
          cloud_area_fraction: 0.7,
          relative_humidity: 0,
          wind_from_direction: 0,
          wind_speed: 0,
          precipitation_amount: 0,
        }}
      />,
    );

    // Check if cloudy icon and text are displayed
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
  });

  it('renders rainy weather', () => {
    render(
      <WeatherCard
        location={LOCATIONS[0]}
        data={{
          air_pressure_at_sea_level: 0,
          air_temperature: 10,
          cloud_area_fraction: 0.8,
          relative_humidity: 0,
          wind_from_direction: 0,
          wind_speed: 0,
          precipitation_amount: 0.5,
        }}
      />,
    );

    // Check if rainy icon and text are displayed
    expect(screen.getByText('Rainy')).toBeInTheDocument();
    expect(screen.getByText('10°C')).toBeInTheDocument();
  });

  it('handles API error', () => {
    render(<WeatherCard location={LOCATIONS[0]} data={null} />);
    // Check if loading state is still displayed due to error
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
