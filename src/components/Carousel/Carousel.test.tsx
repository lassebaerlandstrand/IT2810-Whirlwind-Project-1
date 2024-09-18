import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import LOCATIONS from '../../utils/locations';
import Carousel from './Carousel';

// Mock react-query's useQuery hook
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

describe('Carousel', () => {
  test('that it renders the WeatherCard component in the carousel properly', () => {
    const data = {
      air_pressure_at_sea_level: 0,
      air_temperature: 10,
      cloud_area_fraction: 0,
      relative_humidity: 0,
      wind_from_direction: 0,
      wind_speed: 0,
      precipitation_amount: 0,
    };
    render(<Carousel currentIndex={0} data={data} />);

    expect(screen.getByText(LOCATIONS[0].city_name + ', ' + LOCATIONS[0].country_name)).toBeInTheDocument();
    expect(screen.getByText('10°C')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });

  test('renders the previous city link correctly', () => {
    render(<Carousel currentIndex={0} data={undefined} />);

    const prevCity = LOCATIONS[LOCATIONS.length - 1].city_name;
    expect(screen.getByText(prevCity)).toBeInTheDocument();
  });

  test('renders the next city link correctly', () => {
    render(<Carousel currentIndex={0} data={undefined} />);

    const nextCity = LOCATIONS[1].city_name;
    expect(screen.getByText(nextCity)).toBeInTheDocument();
  });

  test('renders the first city’s previous link correctly (wraps around)', () => {
    render(<Carousel currentIndex={LOCATIONS.length - 1} data={undefined} />);

    const prevCity = LOCATIONS[0].city_name;
    expect(screen.getByText(prevCity)).toBeInTheDocument();
  });
});
