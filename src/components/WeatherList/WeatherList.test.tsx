import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LOCATIONS from '../../utils/locations';
import WeatherList from './WeatherList';

const queryClient = new QueryClient();

describe('WeatherList', () => {
  it('renders weather cards for all locations', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          {' '}
          <WeatherList locations={LOCATIONS} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      LOCATIONS.forEach((location) => {
        expect(screen.getByText(location.city_name)).toBeInTheDocument();
      });
    });
  });

  it('renders empty state when no locations are provided', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          {' '}
          <WeatherList locations={[]} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const weatherList = screen.getByTestId('weather-list');
    expect(weatherList).toBeEmptyDOMElement();
  });
});
