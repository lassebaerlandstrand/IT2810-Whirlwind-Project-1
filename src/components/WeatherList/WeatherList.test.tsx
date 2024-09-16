import { render, screen } from '@testing-library/react';
import LOCATIONS from '../../utils/locations';
import WeatherList from './WeatherList';

describe('WeatherList', () => {
  it('renders weather cards for all locations', () => {
    render(<WeatherList locations={LOCATIONS} />);

    LOCATIONS.forEach((location) => {
      expect(screen.getByText(location.city_name)).toBeInTheDocument();
    });
  });

  it('renders empty state when no locations are provided', () => {
    render(<WeatherList locations={[]} />);

    const weatherList = screen.getByTestId('weather-list');
    expect(weatherList).toBeEmptyDOMElement();
  });
});
