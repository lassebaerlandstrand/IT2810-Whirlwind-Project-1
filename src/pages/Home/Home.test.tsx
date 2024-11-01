import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LocationProvider } from '../../contexts/LocationContext';
import Home from './Home';

const queryClient = new QueryClient();

describe('Home', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </MemoryRouter>
        </LocationProvider>
      </QueryClientProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
