import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { vi } from 'vitest';
import { LocationProvider } from '../../contexts/LocationContext';
import LOCATIONS from '../../utils/locations';
import Location from './Location';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

const queryClient = new QueryClient();

describe('Location', () => {
  test('should match snapshot', () => {
    (useParams as jest.Mock).mockReturnValue({ locationName: LOCATIONS[0].city_name });

    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/location/${LOCATIONS[0].city_name}`]}>
          <LocationProvider>
            <Routes>
              <Route path="/location/:city_name" element={<Location />} />
            </Routes>
          </LocationProvider>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
