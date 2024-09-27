import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Location from './Location';
import LOCATIONS from '../../utils/locations';

const queryClient = new QueryClient();

describe('Location', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Routes>
            <Route path={"/location" + LOCATIONS[0].city_name} element={<Location />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
