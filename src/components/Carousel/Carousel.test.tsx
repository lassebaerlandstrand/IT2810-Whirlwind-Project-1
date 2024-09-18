import { useQuery } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import LOCATIONS from '../../utils/locations';
import Carousel from './Carousel';

// Mock react-query's useQuery hook
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

describe('Carousel', () => {
  beforeEach(() => {
    // Mock useQuery before each test case
    (useQuery as jest.Mock).mockReturnValue({
      data: { locationName: LOCATIONS[0].city_name },
      isLoading: false,
      isError: false,
    });
  });

  test('renders the current location based on the URL parameter', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/location/' + LOCATIONS[0].city_name]}>
        <Routes>
          <Route path="/location/:locationName" element={<Carousel />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(getByText(LOCATIONS[0].city_name + ', ' + LOCATIONS[0].country_name)).toBeInTheDocument();
  });

  test('renders the previous city link correctly', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/location/' + LOCATIONS[0].city_name]}>
        <Routes>
          <Route path="/location/:locationName" element={<Carousel />} />
        </Routes>
      </MemoryRouter>,
    );
    const prevCity = LOCATIONS[LOCATIONS.length - 1].city_name;
    expect(getByText(prevCity)).toBeInTheDocument();
  });

  test('renders the next city link correctly', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/location/' + LOCATIONS[0].city_name]}>
        <Routes>
          <Route path="/location/:locationName" element={<Carousel />} />
        </Routes>
      </MemoryRouter>,
    );
    const nextCity = LOCATIONS[1].city_name;
    expect(getByText(nextCity)).toBeInTheDocument();
  });

  test('renders the first city’s previous link correctly (wraps around)', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/location/' + LOCATIONS[0].city_name]}>
        <Routes>
          <Route path="/location/:locationName" element={<Carousel />} />
        </Routes>
      </MemoryRouter>,
    );
    const prevCity = LOCATIONS[LOCATIONS.length - 1].city_name;
    expect(getByText(prevCity)).toBeInTheDocument();
  });

  test('renders the last city’s next link correctly (wraps around)', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/location/' + LOCATIONS[LOCATIONS.length - 1].city_name]}>
        <Routes>
          <Route path="/location/:locationName" element={<Carousel />} />
        </Routes>
      </MemoryRouter>,
    );
    const nextCity = LOCATIONS[0].city_name;
    expect(getByText(nextCity)).toBeInTheDocument();
  });

  test('renders WeatherCard with correct location data', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/location/' + LOCATIONS[0].city_name]}>
        <Routes>
          <Route path="/location/:locationName" element={<Carousel />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(getByText(LOCATIONS[0].city_name + ', ' + LOCATIONS[0].country_name)).toBeInTheDocument(); // Assuming WeatherCard shows the city name
  });

  test('handles loading state correctly', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    const { getByText } = render(
      <MemoryRouter initialEntries={['/location/' + LOCATIONS[0].city_name]}>
        <Routes>
          <Route path="/location/:locationName" element={<Carousel />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(getByText('Loading...')).toBeInTheDocument(); // Assuming you have a loading state
  });

  test('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/location/' + LOCATIONS[0].city_name]}>
        <Routes>
          <Route path="/location/:locationName" element={<Carousel />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
