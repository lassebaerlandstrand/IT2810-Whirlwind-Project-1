import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { vi } from 'vitest';
import { useWeather } from '../../hooks/useWeather';
import LOCATIONS from '../../utils/locations';
import ListWeatherCard from './ListWeatherCard';

vi.mock('../../hooks/useWeather');

const location = LOCATIONS[0];

describe('ListWeatherCard', () => {
  it('renders loading state', () => {
    (useWeather as jest.Mock).mockReturnValue({ isLoading: true });

    render(
      <MemoryRouter>
        <ListWeatherCard location={location} />
      </MemoryRouter>,
    );

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

    render(
      <MemoryRouter>
        <ListWeatherCard location={location} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useWeather as jest.Mock).mockReturnValue({ error: true });

    render(
      <MemoryRouter>
        <ListWeatherCard location={location} />
      </MemoryRouter>,
    );

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

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <ListWeatherCard location={location} />
      </Router>,
    );

    const weatherCard = screen.getByTestId('link-button');
    fireEvent.click(weatherCard);

    expect(history.location.pathname).toBe(`/location/${location.city_name}`);
  });
});
